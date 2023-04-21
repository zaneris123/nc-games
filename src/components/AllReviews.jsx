import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllReviews, getCategories } from "./api"
import ReviewRow from "./reviewRow"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

function AllReviews(){
    const [allReviews, setAllReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const { category } = useParams()
    const [reviewErr, setReviewErr] = useState(null)
    const [allCategories, setAllCategories] = useState([])
    const navigate = useNavigate()
    const order_by = searchParams.get('order_by')
    const order = searchParams.get('order')

    const CategoryHandler = (event) => {
        event.preventDefault()
        navigate(`/reviews/${event.target.value}`, {replace: true})
    }
    const OrderingHandler = (event, value) => {
        event.preventDefault()
        const newParams = new URLSearchParams(searchParams)
        if(newParams.get('order_by') === value){
            if(newParams.get('order')==='desc'){
                newParams.set('order','asc')
            } else{
                newParams.set('order','desc')
            }
        }
        newParams.set('order_by', value)
        setSearchParams(newParams)
    }
    
    useEffect(()=>{
        setIsLoading(true)
        getCategories()
        .then((categoriesArr)=>{
            setAllCategories(categoriesArr)
        })
        getAllReviews({category, order_by, order})
        .then((reviews)=>{
            setAllReviews(reviews)
            setIsLoading(false)
        })
        .catch((err)=>{
            setReviewErr(err.response.data.msg)
            setIsLoading(false)
        })
    },[category, order_by, order])

    return isLoading ? (<p>Loading...</p>):(
        <TableContainer>
            {reviewErr?<p><br/>{reviewErr}</p>:
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>
                            <select name="category" id="category" onChange={CategoryHandler}>
                                <option key='default' value="">Categories</option>
                                <option key='All' value="">All</option>
                                {allCategories.map(singleCategory => (<option key={singleCategory.slug} value={singleCategory.slug}>{singleCategory.slug}</option>))}
                            </select>
                        </TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell><button onClick={(event)=>OrderingHandler(event, "created_at")} ><span>📅</span></button></TableCell>
                        <TableCell><button onClick={(event)=>OrderingHandler(event, "comment_count")} ><span>🗨️</span></button></TableCell>
                        <TableCell><button onClick={(event)=>OrderingHandler(event, "votes")} ><span>🗳️</span></button></TableCell>
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