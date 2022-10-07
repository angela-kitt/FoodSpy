import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Items from '../Items'
import { getList } from '../../actions/list'

const fakeAllItems = [
  {
    id: 1,
    name: 'Milk',
    description: '2L lite blue milk',
    image_url: '/images/milk.jpg',
    location: 'PAKnSAVE Mt Albert',
    price: 3.95,
  },
]

jest.mock('../../actions/list')
jest.mock('react-redux')
const getListMockReturn = jest.fn()
const fakeDispatch = jest.fn()

describe('<Items />', () => {
  it('gets state list data on initial render', () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    getList.mockReturnValue(getListMockReturn)
    render(<Items />, { wrapper: BrowserRouter })

    const description = screen.getByText(/2L lite blue milk/i)

    expect(fakeDispatch).toHaveBeenCalledWith(getListMockReturn)
    expect(description).toHaveTextContent('milk')
  })
  it('displays first heading correctly', () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Items />, { wrapper: BrowserRouter })

    const headings = screen.getAllByRole('heading')
    expect(headings[0]).toHaveTextContent('Sorry, no results found')
  })
  it('displays check prices button correctly', async () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Items />, { wrapper: BrowserRouter })

    const priceButton = screen.getAllByRole('button', { name: 'Check Prices' })
    const clicked = await fireEvent.click(priceButton[0], { shiftKey: true })
    expect(priceButton[0]).toBeTruthy()
    expect(clicked).toBeFalsy()
  })
  it('displays item images correctly', () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Items />, { wrapper: BrowserRouter })

    const image = screen.getAllByRole('img')
    expect(image).toBeTruthy()
    expect(image).toHaveLength(1)
    expect(image[0].src).toContain('milk')
  })
  it('clicking item images works', async () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Items />, { wrapper: BrowserRouter })

    const image = screen.getAllByRole('img')
    const click = await fireEvent.click(image[0], { shiftKey: true })
    expect(image[0]).toBeTruthy()
    expect(click).toBeTruthy()
  })
  it('keydown item images works', async () => {
    useSelector.mockReturnValue(fakeAllItems)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Items />, { wrapper: BrowserRouter })

    const key = screen.getAllByTestId('imageKeyDown')
    const keyDown = await fireEvent.keyPress(key[0], {
      key: 'Enter',
      keyCode: 13,
    })

    expect(keyDown).toBeTruthy()
  })
})
