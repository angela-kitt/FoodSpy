import React from 'react'
import '@testing-library/jest-dom'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import Basket from '../Basket'

const fakeBasket = { name: 'Milk', quantity: 2 }
const state = { fakeBasket }
const setBasket = (Storage.prototype.setBasket = jest.fn())

jest
  .spyOn(redux, 'useSelector')
  .mockImplementation((callback) => callback(state))

describe('<Basket />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets props from parent component', () => {
    render(<Basket basket={fakeBasket} setBasket={setBasket} />, {
      wrapper: BrowserRouter,
    })

    const itemCount = screen.getAllByText('Item count:')
    expect(itemCount[0]).toBeTruthy()
    expect(setBasket).not.toHaveBeenCalled()
  })
  it('gets name and quantity from redux state', () => {
    render(<Basket basket={fakeBasket} setBasket={setBasket} />, {
      wrapper: BrowserRouter,
    })

    const itemQuantity = screen.findByText(fakeBasket.quantity)
    const itemName = screen.findByText(fakeBasket.name)
    expect(itemQuantity).toBeTruthy()
    expect(itemName).toBeTruthy()
  })
  it('displays heading correctly', () => {
    render(<Basket basket={fakeBasket} setBasket={setBasket} />, {
      wrapper: BrowserRouter,
    })

    const heading = screen.getAllByRole('heading')
    expect(heading[0]).toHaveTextContent('Total cost')
  })
  it('displays minus button', async () => {
    const user = userEvent.setup()
    render(<Basket basket={fakeBasket} setBasket={setBasket} />, {
      wrapper: BrowserRouter,
    })

    const minusButton = screen.getAllByRole('button')
    const clicked = user.click(minusButton[0], { shiftKey: true })
    expect.assertions(3)
    expect(minusButton).toBeTruthy()
    expect(minusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
  it('displays plus button', async () => {
    const user = userEvent.setup()
    render(<Basket basket={fakeBasket} setBasket={setBasket} />, {
      wrapper: BrowserRouter,
    })

    const plusButton = screen.getAllByRole('button', { name: '+' })
    const clicked = user.click(plusButton[0], { shiftKey: true })
    expect.assertions(3)
    expect(plusButton).toBeTruthy()
    expect(plusButton).not.toBeNull()
    expect(clicked).toBeTruthy()
  })
})
