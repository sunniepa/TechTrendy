// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export const fetchCartCount = createAsyncThunk('cart/fetchCount', async () => {
  const accessToken = localStorage.getItem('accessToken')
  const decodedToken = jwtDecode(accessToken)
  const userId = decodedToken.nameid

  const response = await axios.get(`https://localhost:5000/api/Cart/${userId}`)
  const cartItems = response.data.data.cartItems
  const count = cartItems.length
  return count
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { count: 0 },
  reducers: {
    decrement: (state) => {
      state.count -= 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartCount.fulfilled, (state, action) => {
      state.count = action.payload
    })
  },
})

export const { decrement } = cartSlice.actions
export default cartSlice.reducer
