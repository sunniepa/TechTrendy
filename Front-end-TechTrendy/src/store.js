import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
import viewProductReducer from './viewProduct'
export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    viewProduct: viewProductReducer,
  },
})
