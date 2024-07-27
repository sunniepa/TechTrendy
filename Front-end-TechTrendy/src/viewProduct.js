import { createSlice } from '@reduxjs/toolkit'

const viewedProductsSlice = createSlice({
  name: 'viewedProducts',
  initialState: {},
  reducers: {
    addViewedProduct: (state, action) => {
      const { userId, product } = action.payload
      if (!state[userId]) {
        state[userId] = []
      }
      state[userId].unshift(product)
    },
  },
})

export const { addViewedProduct } = viewedProductsSlice.actions
export default viewedProductsSlice.reducer
