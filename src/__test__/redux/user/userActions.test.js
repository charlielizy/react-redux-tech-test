import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../../../redux/user/userActions'
import * as types from '../../../redux/user/userTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({});

describe('user action creation', () => {
  it('should create an action to fetch request', () => {
    const expectedAction = {
      type: types.FETCH_USERS_REQUEST,
    }
    expect(actions.fetchUsersRequest()).toEqual(expectedAction)
  })
  it('should create an action to fetch successfully', () => {
    const user = "user one"
    const expectedAction = {
      type: types.FETCH_USERS_SUCCESS,
      payload: user
    }
    expect(actions.fetchUsersSuccess(user)).toEqual(expectedAction)
  })
  it('should create an action to fetch with error', () => {
    const error = "error message"
    const expectedAction = {
      type: types.FETCH_USERS_FAILURE,
      payload: error
    }
    expect(actions.fetchUsersFailure(error)).toEqual(expectedAction)
  })
})

describe('async fetchUsers action', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_USERS_SUCCESS when fetching users has been done', () => {
    fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
      payload: 'users' ,
    })

    const expectedActions = [   
      { type: types.FETCH_USERS_REQUEST },
      { type: types.FETCH_USERS_SUCCESS, payload: {payload: 'users'}}
    ]

    return store.dispatch(actions.fetchUsers()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
