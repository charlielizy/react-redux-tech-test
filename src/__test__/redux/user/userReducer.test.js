import reducer from '../../../redux/user/userReducer'
import * as types from '../../../redux/user/userTypes'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      users: [],
      error: ''
    })
  })

  it('should handle FETCH_USERS_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FETCH_USERS_REQUEST,
      })
    ).toEqual(
      {
        loading: true,
      }
    )
  })

  it('should handle FETCH_USERS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_USERS_SUCCESS,
        payload: "test users",
      })
    ).toEqual(
      {
        loading: false,
        users: "test users",
        error: ''
      }
    )
  })

  it('should handle FETCH_USERS_FAILURE', () => {
    expect(
      reducer([], {
        type: types.FETCH_USERS_FAILURE,
        payload: 'error',
      })
    ).toEqual(
      {
        loading: false,
        users: [],
        error: 'error'
      }
    )
  })
})