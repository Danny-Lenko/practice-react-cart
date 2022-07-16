import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  cart: [],
  loading: true,
  itemsNumber: 0,
  cashAmount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch({type: 'FETCH_DATA', payload: data}))
  }, [])

  useEffect(() => {
    dispatch({type: 'COUNT_AMOUNTS'})
  }, [state.cart])


  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
