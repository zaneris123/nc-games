import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllReviews } from "./api"
import ReviewRow from "./reviewRow"

function AllReviews(){
    const [allReviews, setAllReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reviewParams, setReviewParams] = useState({category: 'stratge'})
    const [reviewErr, setReviewErr] = useState(null)

    
    useEffect(()=>{
        setIsLoading(true)
        getAllReviews(reviewParams)
        .then((reviews)=>{
            setAllReviews(reviews)
            setIsLoading(false)
        })
        .catch((err)=>{
            setReviewErr(err.response.data.msg)
        })
    },[])
    return isLoading ? (<p>Loading...</p>):reviewErr?(<p>{reviewErr}</p>):(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID #</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell><span>📅</span></TableCell>
                        <TableCell><span>🗨️</span></TableCell>
                        <TableCell><span>🗳️</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allReviews.map(review => (<ReviewRow key={review.review_id} review={review}/>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AllReviews