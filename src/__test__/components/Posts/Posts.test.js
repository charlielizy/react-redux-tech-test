import * as reactRedux from 'react-redux'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router, Route } from 'react-router-dom'

import Posts from '../../../components/Posts/Posts'

describe('Render Posts Component', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  const useEffectMock = jest.spyOn(React, "useEffect")

  const renderWithRouter = (component) => {
    const history = createMemoryHistory({
      initialEntries: ["/posts/1"],
    })
    const Wrapper = ({ children }) => (
      <Router history={history}>
        <Route path="/posts/:userId">{children}</Route>
      </Router>
    )
    return {
      ...render(component, { wrapper: Wrapper }),
      history,
    }
  }


  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    useEffectMock.mockClear()
  })

  afterEach(cleanup)

  it('with posts data', () => {
    useSelectorMock.mockReturnValue({
      "post": {
        "error": "",
        "loading": false,
        "posts": [
          { "userId": 1, "id": 1, "title": "title one", "body": "body one" },
          { "userId": 1, "id": 2, "title": "title two", "body": "body two" }
        ]
      },
      "user": {
        "error": "",
        "loading": false,
        "users": [
          { "id": 1, "name": "Leanne Graham", "email": "Sincere@april.biz" },
          { "id": 2, "name": "Ervin Howell", "email": "Shanna@melissa.tv" }
        ]
      }
    })

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    useEffectMock()
    useEffectMock()

    const { getByTestId, getByText } = renderWithRouter(<Posts />)
    expect(getByTestId('postTable')).toBeTruthy()
    expect(screen.getByText(/title one/i)).toBeInTheDocument()
  })
  
  it('without posts data', () => {
    useSelectorMock.mockReturnValue({
      "post": {
        "error": "",
        "loading": false,
        "posts": [ ]
      },
      "user": {
        "error": "",
        "loading": false,
        "users": [
          { "id": 1, "name": "Leanne Graham", "email": "Sincere@april.biz" },
          { "id": 2, "name": "Ervin Howell", "email": "Shanna@melissa.tv" }
        ]
      }
    })

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    useEffectMock()
    useEffectMock()

    const { queryByTestId } = renderWithRouter(<Posts />)
    expect(queryByTestId('userTable')).toBeNull()
    expect(screen.queryByText(/Title one/i)).toBeNull()
  })
})