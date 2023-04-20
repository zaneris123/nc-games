import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllReviews, getCategories } from "./api"
import ReviewRow from "./reviewRow"
import { useNavigate, useParams } from "react-router-dom"

function AllReviews(){
    const [allReviews, setAllReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { category } = useParams()
    const [reviewParams, setReviewParams] = useState({category})
    const [reviewErr, setReviewErr] = useState(null)
    const [allCategories, setAllCategories] = useState([])
    const navigate = useNavigate()

    const CategoryHandler = (event) => {
        event.preventDefault()
        navigate(`/reviews/${event.target.value}`, {replace: true})
        setReviewParams((currentParams)=>{
            return {...currentParams, category: event.target.value}
        })
    }
    
    useEffect(()=>{
        setIsLoading(true)
        getCategories()
        .then((categoriesArr)=>{
            setAllCategories(categoriesArr)
        })
        getAllReviews(reviewParams)
        .then((reviews)=>{
            setAllReviews(reviews)
            setIsLoading(false)
        })
        .catch((err)=>{
            console.log(err.response.data.msg)
            setReviewErr(err.response.data.msg)
            setIsLoading(false)
        })
    },[reviewParams])

    return isLoading ? (<p>Loading...</p>):(
        <TableContainer>
            {reviewErr?<p><br/>{reviewErr}</p>:
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID #</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>
                            <select name="category" id="category" onClick={CategoryHandler}>
                                <option key='default' value={null}>Categories</option>
                                {allCategories.map(singleCategory => (<option value={singleCategory.slug}>{singleCategory.slug}</option>))}
                            </select>
                        </TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell><span>📅</span></TableCell>
                        <TableCell><span>🗨️</span></TableCell>
                        <TableCell><span>🗳️</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allReviews.map(review => (<ReviewRow key={review.review_id} review={review}/>))}
                </TableBody>
            </Table>}
            
        </TableContainer>
    )
}
export default AllReviews