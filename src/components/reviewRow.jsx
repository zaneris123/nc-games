import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

function ReviewRow ({review, setReviewParams}){
    const reviewDate = new Date(review.created_at.replace(' ', 'T'))

    return (
        <TableRow>
            <TableCell>{review.review_id}</TableCell>
            <TableCell><Link to={`/reviews/id/${review.review_id}`}>{review.title}</Link></TableCell>
            <TableCell>{review.category}</TableCell>
            <TableCell>{review.owner}</TableCell>
            <TableCell>{`${reviewDate.getDate()}/${reviewDate.getMonth()+1}/${reviewDate.getFullYear()}`}</TableCell>
            <TableCell>{review.comment_count}</TableCell>
            <TableCell>{review.votes}</TableCell>
        </TableRow>
    )
}
export default ReviewRow;