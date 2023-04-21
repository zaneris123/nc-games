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
    const { userObj } = useContext(UserContext)
    const [isPosting, setIsPosting] = useState(false)
    
    const commentHandler = (event) => {
        event.preventDefault()
        setShowcomments(!showComments)
    }
    const postCommentHandler = (event) => {
        event.preventDefault()
        setIsPosting(true)
        postComment(reviewID,{username: userObj.username, body: commentInput})
        .then((newComment)=>{
            setReviewComments((currentComments)=>{
                setIsPosting(false)
                setCommentInput("")
                return[newComment,...currentComments]
            })
        })
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
                    <textarea type='text' value={commentInput} required onChange={(event)=>setCommentInput(event.target.value)}/><br/>
                    <button type='submit' disabled={isPosting}>post Comment</button>
                </form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Comment</TableCell>
                            <TableCell>Posted by</TableCell>
                            <TableCell><span>📅</span></TableCell>
                            <TableCell><span>🗳️</span></TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviewComments.map((comment)=><CommentCard key={comment.comment_id} setReviewComments={setReviewComments} comment={comment}/>)}
                    </TableBody>
                </Table>
            </TableContainer>}
            <p></p>
        </section>
    )
}
export default CommentSection