import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../../../redux/post/postActions'
import * as types from '../../../redux/post/postTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({});

describe('post action creation', () => {
  it('should create an action to fetch request', () => {
    const expectedAction = {
      type: types.FETCH_POSTS_REQUEST,
    }
    expect(actions.fetchPostsRequest()).toEqual(expectedAction)
  })
  it('should create an action to fetch successfully', () => {
    const post = "post one"
    const expectedAction = {
      type: types.FETCH_POSTS_SUCCESS,
      payload: post
    }
    expect(actions.fetchPostsSuccess(post)).toEqual(expectedAction)
  })
  it('should create an action to fetch with error', () => {
    const error = "error message"
    const expectedAction = {
      type: types.FETCH_POSTS_FAILURE,
      payload: error
    }
    expect(actions.fetchPostsFailure(error)).toEqual(expectedAction)
  })
})

describe('async fetchPosts action', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_POSTS_SUCCESS when fetching posts has been done', () => {
    fetchMock.getOnce('https://jsonplaceholder.typicode.com/posts?userId=undefined', {
      payload: 'posts' ,
    })

    const expectedActions = [   
      { type: types.FETCH_POSTS_REQUEST },
      { type: types.FETCH_POSTS_SUCCESS, payload: {payload: 'posts'}}
    ]

    return store.dispatch(actions.fetchPosts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
