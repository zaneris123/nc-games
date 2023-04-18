import { TableCell, TableRow } from "@mui/material";

function ReviewRow ({review}){
    const reviewDate = new Date(review.created_at.replace(' ', 'T'))
    console.log(reviewDate)
    return (
        <TableRow>
            <TableCell>{review.review_id}</TableCell>
            <TableCell>{review.title}</TableCell>
            <TableCell>{review.category}</TableCell>
            <TableCell>{review.owner}</TableCell>
            <TableCell>{`${reviewDate.getDate()}/${reviewDate.getMonth()+1}/${reviewDate.getFullYear()}`}</TableCell>
            <TableCell>{review.comment_count}</TableCell>
            <TableCell>{review.votes}</TableCell>
        </TableRow>
    )
}
export default ReviewRow;