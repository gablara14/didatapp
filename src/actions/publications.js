

import axios from 'axios'
import axiosApi from '../api/axiosConfig'




export const createPublication = (data) => async dispatch => {
    const {
        
        type,
        userId,
        communityId,
        body
     } = data
    const res = await axiosApi.post('/publications', { type, userId, communityId, body })
    dispatch({ type: 'FETCH_PUBLICATION', payload: res.data })
}


export const createImagePublication = (data) => async dispatch => {
    const {
        
        type,
        userId,
        communityId,
        file,
        body,
        likes,
     } = data

     const uploadConfig = await axiosApi.get(`/api/upload/${userId}`)
     await axiosApi.put(uploadConfig.data.url, file, {
         headers: {'Content-Type': file.type}})

    const res = await axiosApi.post('/publications', { type, userId, communityId, body, likes, imageURL: uploadConfig.data.key })
    dispatch({ type: 'FETCH_PUBLICATION', payload: res.data })
}



export const fetchPublicationsByUserId = (id) => async dispatch => {
    const res = await axiosApi.get(`/users/${id}/publications`)
    dispatch({ type: 'FETCH_PUBLICATIONS', payload: res.data })
}

export const fetchPublicationsByCommunityId = (id) => async dispatch => {
    const res = await axiosApi.get(`/communities/${id}/publications`)
    dispatch({ type: 'FETCH_PUBLICATIONS', payload: res.data })
}


export const likePublication = (data) => async dispatch => {
    const {userId, publicationId} = data
    const res = await axiosApi.post(`/publications/${publicationId}/interactions`,{userId})
    dispatch({ type: 'FETCH_PUBLICATION', payload: res.data })
}

export const dislikePublication = (data) => async dispatch => {
    const {userId, publicationId} = data
    const res = await axiosApi.delete(`/publications/${publicationId}/interactions`, {userId} )
    dispatch({ type: 'FETCH_PUBLICATION', payload: res.data })
}