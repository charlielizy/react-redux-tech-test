import * as reactRedux from 'react-redux'
import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import  {Router }from 'react-router-dom'

import Users from '../../../components/Users/Users'


describe('Render Users Component', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  const useEffectMock = jest.spyOn(React, "useEffect")
  const history = createMemoryHistory()
  history.push = jest.fn()

  const wrapper = (children) => (
    <Router history={history}>
     {children}
    </Router>
  )

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
  })

  afterEach(cleanup)

  it('with users data', () => {
    useSelectorMock.mockReturnValue({
      "users": [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        }
      ]
    })

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    useEffectMock()

    const { getByTestId } = render(<Users />)
    expect(getByTestId('userTable')).toBeTruthy()
    expect(screen.getByText(/Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument()
  })

  it('without users data', () => {
    useSelectorMock.mockReturnValue({
      "users": []
    })

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    useEffectMock()

    const { queryByTestId } = render(<Users />)
    expect(queryByTestId('userTable')).toBeNull()
    expect(screen.queryByText(/Name/i)).toBeNull()
    expect(screen.queryByText(/Leanne Graham/i)).toBeNull()
  })

  it('fireEvent onClick function handleClickRow', () => {
    useSelectorMock.mockReturnValue({
      "users": [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }
      ]
    })

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    useEffectMock()

    render(wrapper(<Users />))

    fireEvent.click(screen.getByText(/Leanne Graham/i), {
      target: { id: 1 }
    })

    expect(history.push).toBeCalled()
  })
})