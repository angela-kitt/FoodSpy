import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import Basket from '../Basket'

const fakeBasket = { name: 'Milk', quantity: 2 }

describe('<Basket />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const fakeDispatch = jest.fn()
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: fakeDispatch,
    getState: jest.fn(() => {
      return { basket: fakeBasket }
    }),
  }

  it('gets name and quantity from redux state', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    )
    const itemName = screen.findByText(fakeBasket.name, {
      exact: false,
    })
    const itemQuantity = screen.findByText(fakeBasket.quantity)
    expect.assertions(2)
    expect(itemName).toBeTruthy()
    expect(itemQuantity).toBeTruthy()
  })
  it('displays minus button', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    )
    const minusButton = screen.findAllByRole('button')
    const clicked = user.click(minusButton[0], { shiftKey: true })
    expect.assertions(3)
    expect(minusButton).toBeTruthy()
    expect(minusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
  it('displays plus button', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Basket />
        </BrowserRouter>
      </Provider>
    )
    const plusButton = screen.findByRole('button', { name: '+' })
    const clicked = user.click(plusButton, { shiftKey: true })
    expect.assertions(3)
    expect(plusButton).toBeTruthy()
    expect(plusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
})
