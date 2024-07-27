import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const searchProducts = createAsyncThunk(
  'searchTerm/searchProducts',
  async (searchTerm, thunkAPI) => {
    const response = await axios.get(
      `https://localhost:5000/api/Products/search-products?nameQuery=${searchTerm}&pageNumber=1&pageSize=10`
    )
    const laptops = Array.isArray(response.data.laptops)
      ? response.data.laptops
      : []
    const tablets = Array.isArray(response.data.tablets)
      ? response.data.tablets
      : []
    console.log(laptops)

    return [...laptops, ...tablets]
  }
)

const searchSlice = createSlice({
  name: 'searchTerm',
  initialState: { term: '', products: [] },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  },
})

export const { setSearchTerm } = searchSlice.actions
export default searchSlice.reducer
