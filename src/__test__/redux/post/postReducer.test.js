import reducer from '../../../redux/post/postReducer'
import * as types from '../../../redux/post/postTypes'

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      posts: [],
      error: ''
    })
  })

  it('should handle FETCH_POSTS_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FETCH_POSTS_REQUEST,
      })
    ).toEqual(
      {
        loading: true,
      }
    )
  })

  it('should handle FETCH_POSTS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_POSTS_SUCCESS,
        payload: "test posts",
      })
    ).toEqual(
      {
        loading: false,
        posts: "test posts",
        error: ''
      }
    )
  })

  it('should handle FETCH_POSTS_FAILURE', () => {
    expect(
      reducer([], {
        type: types.FETCH_POSTS_FAILURE,
        payload: 'error',
      })
    ).toEqual(
      {
        loading: false,
        posts: [],
        error: 'error'
      }
    )
  })
})