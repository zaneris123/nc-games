import axios from "axios"

const gamesApi = axios.create({
    baseURL: 'https://nc-project-games.onrender.com/api'
})


export const getAllReviews = () =>{
    return gamesApi.get('/reviews')
    .then(({data})=>{
        return data.reviews
    })
}
export const getSingleReview = (id) =>{
    return gamesApi.get(`/reviews/${id}`)
    .then(({data})=>{
        return data.review
    })
}
export const getReviewComments = (reviewID) =>{
    return gamesApi.get(`/reviews/${reviewID}/comments`)
    .then(({data})=>{
        return data.comments
    })
}
export const patchVoteReview = (reviewID, value) => {
    return gamesApi.patch(`/reviews/${reviewID}`, {inc_votes: value})
    .then(({data})=>{
        return data.review
    })
}
export const getUsers = () => {
    return gamesApi.get(`/users/`)
    .then(({data})=>{
        return data.users
    })
}
export const postComment = (reviewID, commentData) =>{
    return gamesApi.post(`/reviews/${reviewID}/comments`, commentData)
    .then(({data})=>{
        return data.comment
    })
}