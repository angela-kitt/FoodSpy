import React from 'react'
import { useSelector } from 'react-redux'

import SmallMap from './SmallMap'

function Basket({ basket, setBasket }) {
  const allItems = useSelector((state) => {
    return state.basket
  })

  const runningTotal = {}
  allItems?.forEach?.((itemData) => {
    runningTotal[itemData.location] = 0
  })

  Object.keys(basket || {}).forEach((itemId) => {
    allItems?.forEach?.((complexData) => {
      if (complexData.item_id == itemId) {
        runningTotal[complexData.location] =
          runningTotal[complexData.location] +
          complexData.price * basket[itemId].quantity
      }
    })
  })

  let bestLocation = ''
  let bestPrice = 0
  Object.keys(runningTotal || {}).forEach((location) => {
    if (bestPrice == 0 || runningTotal[location] < bestPrice) {
      bestLocation = location
      bestPrice = runningTotal[location]
    }
  })

  function handleMinusClick(itemId, name, quantity) {
    if (quantity - 1 == 0) {
      const basketCopy = { ...basket }
      delete basketCopy[itemId]
      setBasket(basketCopy)
      return
    }
    setBasket({ ...basket, [itemId]: { name: name, quantity: quantity - 1 } })
  }

  function handlePlusClick(itemId, name, quantity) {
    setBasket({ ...basket, [itemId]: { name: name, quantity: quantity + 1 } })
  }

  return (
    <div>
      <h2>Total cost:</h2>
      {Object.keys(basket || {}).map((itemId) => {
        return (
          <div key={itemId}>
            <h3 className="basketText">{basket[itemId].name}</h3>
            <p className="smallBasketText">
              Item count: {basket[itemId].quantity}
              <button
                className="minusButton"
                onClick={() => {
                  handleMinusClick(
                    itemId,
                    basket[itemId].name,
                    basket[itemId].quantity
                  )
                }}
              >
                -
              </button>
              <button
                className="plusButton"
                onClick={() => {
                  handlePlusClick(
                    itemId,
                    basket[itemId].name,
                    basket[itemId].quantity
                  )
                }}
              >
                +
              </button>
            </p>
          </div>
        )
      })}
      <div>
        {bestPrice !== 0 && (
          <>
            <h3 className="basketText">Cheapest store:</h3>
            <p className="basketText">{bestLocation}</p>
            <h3 className="basketText">
              <b>Total: $ {Number(bestPrice).toFixed(2)}</b>
            </h3>
            <div className="smallMap">
              <SmallMap location={bestLocation} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Basket
