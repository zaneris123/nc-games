import { useContext, useEffect } from "react"
import { useState } from "react"
import { getReviewComments, postComment } from "./api"
import { useParams } from "react-router-dom"
import CommentCard from "./CommentCard"
import { ExpandMore, Send } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
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
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    Comments - {reviewComments.length} 
                </AccordionSummary>
                <AccordionDetails>
                <TableContainer>
                    <Paper onSubmit={postCommentHandler} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>
                        <InputBase onChange={(event)=>setCommentInput(event.target.value)} required multiline placeholder="Input Comment" sx={{ml: 1, flex: 1}}/>
                        <Button type="submit" disabled={isPosting} endIcon={<Send/>} sx={{px: '10px'}}>post</Button>
                    </Paper>
                <Table>
                    
                    <TableBody>
                        {reviewComments.map((comment)=><CommentCard key={comment.comment_id} setReviewComments={setReviewComments} comment={comment}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
                </AccordionDetails>
            </Accordion>
            {!showComments ? null : <p></p>}
            <p></p>
        </section>
    )
}
export default CommentSection