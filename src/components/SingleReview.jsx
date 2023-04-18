import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleReview } from "./api"
import CommentSection from "./CommentSection"

function SingleReview (){
    const {reviewID} = useParams()
    const [reviewData, setReviewData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getSingleReview(reviewID)
        .then((review)=>{
            setReviewData(review)
            setIsLoading(false)
        })
    },[reviewID])

    return isLoading ? (<p>Loading...</p>):(
        <div>
            <img src={reviewData.review_img_url} alt={reviewData.title} height="200" width="auto"/>
            <section>
                <h2>{reviewData.title}</h2>
                <h3>{reviewData.category}</h3>
                <h4>By {reviewData.owner}</h4>
            </section>
            <p>{reviewData.review_body}</p>
            <h5>votes: {reviewData.votes}</h5>
            <CommentSection reviewID={reviewID}/>
        </div>
    )
}
export default SingleReview