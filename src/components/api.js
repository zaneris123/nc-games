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