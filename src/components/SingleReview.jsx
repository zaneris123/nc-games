import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleReview, patchVoteReview } from "./api"
import CommentSection from "./CommentSection"
import { VoteContext } from "../contexts/voted"
import { Grid, Typography } from "@mui/material"

function SingleReview (){
    const {reviewID} = useParams()
    const [reviewData, setReviewData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { hasVoted, setHasVoted } = useContext(VoteContext)
    const [error, setError] = useState(null)

    const voteHandlerUp = (event) => {
        event.preventDefault()
        setReviewData((currentReview)=>{
            return {...currentReview, votes: currentReview.votes + 1}
        })
        setHasVoted((voted)=>{
            return {...voted, [reviewID]:true}
        })
        patchVoteReview(reviewID, 1)
        .catch((err)=>{
            setReviewData((currentReview)=>{
                return {...currentReview, votes: currentReview.votes - 1}
            })
            setError({err})
        })
    }
    const voteHandlerDown = (event) => {
        event.preventDefault()
        setReviewData((currentReview)=>{
            return {...currentReview, votes: currentReview.votes - 1}
        })
        setHasVoted((voted)=>{
            return {...voted, [reviewID]:true}
        })
        patchVoteReview(reviewID, -1)
        .catch((err)=>{
            setReviewData((currentReview)=>{
                return {...currentReview, votes: currentReview.votes + 1}
            })
            setError({err})
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        getSingleReview(reviewID)
        .then((review)=>{        
            if(!Object.hasOwn(hasVoted,reviewID)){
            setHasVoted((voted)=>{
                return {...voted, [reviewID]: false}
            })
        }
            setReviewData(review)
            setIsLoading(false)
        })
    },[reviewID])

    return isLoading ? (<p>Loading...</p>):(
        <div>
            <Typography variant="h4">{reviewData.title}</Typography>
            <Typography variant="subtitle1">{reviewData.category}</Typography>
            <Typography variant="subtitle2">By {reviewData.owner}</Typography>
            <Grid container alignItems="center" justifyContent="space-around">
                <Grid xs={4}>
            <img src={reviewData.review_img_url} alt={reviewData.title} height="200" width="auto"/>
                </Grid>
                <Grid xs={6}>
                <Typography variant="body2">{reviewData.review_body}</Typography>
    

                </Grid>
            </Grid>

            <section>
            <p>votes: {reviewData.votes}<br/>
            <button value="up" onClick={voteHandlerUp} disabled={hasVoted[reviewID]}><span>⬆️</span></button><button onClick={voteHandlerDown} disabled={hasVoted[reviewID]}><span>⬇️</span></button></p>
            {error ? <p>Unable to vote current, please try again later</p> : null}
            </section>

            <CommentSection reviewID={reviewID}/>
        </div>
    )
}
export default SingleReview