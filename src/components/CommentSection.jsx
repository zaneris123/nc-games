import { useEffect } from "react"
import { useState } from "react"
import { getReviewComments } from "./api"
import { useParams } from "react-router-dom"
import CommentCard from "./CommentCard"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"



function CommentSection (){
    const {reviewID} = useParams()
    const [reviewComments, setReviewComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showComments, setShowcomments] = useState(false)

    const commentHandler = (event) => {
        event.preventDefault()
        setShowcomments(!showComments)
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