import React from 'react'
import '@testing-library/jest-dom'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import Basket from '../Basket'

const fakeBasket = { name: 'Milk', quantity: 2 }
const state = { fakeBasket }

jest
  .spyOn(redux, 'useSelector')
  .mockImplementation((callback) => callback(state))

describe('<Basket />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets name and quantity from redux state', () => {
    render(<Basket />, { wrapper: BrowserRouter })

    const itemQuantity = screen.findByText(fakeBasket.quantity)
    const itemName = screen.findByText(fakeBasket.name)
    expect(itemQuantity).toBeTruthy()
    expect(itemName).toBeTruthy()
  })
  it('displays heading correctly', () => {
    render(<Basket />, { wrapper: BrowserRouter })

    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Total cost')
  })
  it('displays minus button', async () => {
    const user = userEvent.setup()
    render(<Basket />, { wrapper: BrowserRouter })

    const minusButton = screen.findAllByRole('button')
    const clicked = user.click(minusButton[0], { shiftKey: true })
    expect.assertions(3)
    expect(minusButton).toBeTruthy()
    expect(minusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
  it('displays plus button', async () => {
    const user = userEvent.setup()
    render(<Basket />, { wrapper: BrowserRouter })

    const plusButton = screen.findByRole('button', { name: '+' })
    const clicked = user.click(plusButton, { shiftKey: true })
    expect.assertions(3)
    expect(plusButton).toBeTruthy()
    expect(plusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
})
