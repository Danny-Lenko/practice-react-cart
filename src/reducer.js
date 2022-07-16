const reducer = (state, action) => {

   if (action.type === 'FETCH_DATA') {
      return {
         ...state,
         cart: action.payload,
         loading: false
      }
   }
   if (action.type === 'CLEAR_CART') {
      return {...state, cart: []}
   }
   if (action.type === 'REMOVE_ITEM') {
      return {
         ...state,
         cart: state.cart.filter(item => item.id !== action.payload)
      }
   }
   if (action.type === 'INCREASE') {
      return {
         ...state,
         cart: state.cart.map(item => (
            item.id === action.payload
              ? {...item, amount: item.amount + 1}
              : item
         ))
      }
   }
   if (action.type === 'DECREASE') {
      return {
         ...state,
         cart: state.cart.map(item => (
            item.id === action.payload
              ? {...item, amount: item.amount - 1}
              : item
         ))
      }
   }
   if (action.type === 'COUNT_AMOUNTS') {
      const items = state.cart.map(item => item.amount).reduce((a,b) => a+b, 0)
      const cash = state.cart.map(item => item.price * item.amount).reduce((a,b) => +a + +b, 0)
      const theItem = state.cart.find(item => item.amount === 0)

      return {
         ...state,
         itemsNumber: items,
         cashAmount: cash,
         cart: theItem ? state.cart.filter(item => item.id !== theItem.id) : state.cart
      }
   }
   
   throw new Error('no matching action type')   
}

export default reducer