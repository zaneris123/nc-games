import { TableCell, TableRow } from "@mui/material"

function CommentCard ({comment}){
    const commentDate = new Date(comment.created_at.replace(' ', 'T'))
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