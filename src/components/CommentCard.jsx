import { TableCell, TableRow } from "@mui/material"

function CommentCard ({comment}){
    const commentDate = new Date(comment.created_at.replace(' ', 'T'))
    const { userObj } = useContext(UserContext)
    const DeleteHandler = (event) => {
        event.preventDefault()
        if(window.confirm('Are you sure you want to delete this comment?')){
            setReviewComments((currentComments)=>{
                return currentComments.filter(comments=>comments.comment_id!==comment.comment_id)
            })
            deleteComment(comment.comment_id)
            .catch(()=>{
                alert("Error deleting comment")
            })
        }
    }
    return(
        <TableRow>
            <TableCell>{comment.body}</TableCell>
            <TableCell>{comment.author}</TableCell>
            <TableCell>{`${commentDate.getDate()}/${commentDate.getMonth()+1}/${commentDate.getFullYear()}`}</TableCell>
            <TableCell>{comment.votes}</TableCell>
        </TableRow>
    )
}
export default CommentCard