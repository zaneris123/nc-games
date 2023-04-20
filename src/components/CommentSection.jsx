import { useContext, useEffect } from "react"
import { useState } from "react"
import { getReviewComments, postComment } from "./api"
import { useParams } from "react-router-dom"
import CommentCard from "./CommentCard"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { UserContext } from "../contexts/user"



function CommentSection (){
    const [commentInput, setCommentInput] = useState("")
    const {reviewID} = useParams()
    const [reviewComments, setReviewComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showComments, setShowcomments] = useState(false)
    const { username } = useContext(UserContext)
    const [commentErr, setCommentErr] = useState(null)
    
    const commentHandler = (event) => {
        event.preventDefault()
        setShowcomments(!showComments)
    }
    const postCommentHandler = (event) => {
        event.preventDefault()
        if(commentInput.length > 10){
            postComment(reviewID,{username: username.username, body: commentInput})
            .then((newComment)=>{
                setReviewComments((currentComments)=>{
                    return[...currentComments, newComment]
                })
            })
        } else {
            setCommentErr("Comment must be atleast 10 characters")
        }
    }

    useEffect(()=>{
        setIsLoading(true)
        getReviewComments(reviewID)
        .then((commentData)=>{
            setReviewComments(commentData)
            setIsLoading(false)
        })
    },[reviewID])

    return isLoading ? (<p>Loading...</p>):(
        <section>
            <button onClick={commentHandler}>Comments - {reviewComments.length}</button>
            {!showComments ? null :             
            <TableContainer>
                <form onSubmit={postCommentHandler}>
                    <br/>
                    <input type='text' onChange={(event)=>setCommentInput(event.target.value)}/>
                    <button type='submit'>post Comment</button>
                    <p>{commentErr}</p>
                </form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Comment</TableCell>
                            <TableCell>Posted by</TableCell>
                            <TableCell><span>📅</span></TableCell>
                            <TableCell><span>🗳️</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviewComments.map((comment)=><CommentCard key={comment.comment_id} comment={comment}/>)}
                    </TableBody>
                </Table>
            </TableContainer>}
            <p></p>
        </section>
    )
}
export default CommentSection