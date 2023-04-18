import { useEffect } from "react"
import { useState } from "react"
import { getReviewComments } from "./api"



function CommentSection (){
    const [reviewComments, setReviewComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getReviewComments(reviewID)
        .then((commentData)=>{
            setReviewComments(commentData)
            setIsLoading(false)
        })
    },[])

    return isLoading ? (<p>Loading...</p>):(
        <section>
            <h4>Comments - {reviewComments.length()}</h4>
        </section>
    )
}