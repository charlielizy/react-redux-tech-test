import axios from 'axios'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from './postTypes'

export const fetchPosts = (userId) => {
  return (dispatch) => {
    dispatch(fetchPostsRequest())
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => res.json())
      .then(posts => {
        // response.data is the posts
        dispatch(fetchPostsSuccess(posts))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPostsFailure(error.message))
      })
  }
}

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

export const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  }
}

export const fetchPostsFailure = error => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  }
}