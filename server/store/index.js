import {configureStore} from '@reduxjs/toolkit'
import allProductsSlice from './allProductsSlice'
import SingleProductSlice from './singleProductSlice'

const store = configureStore({
  reducer: {
    products: allProductsSlice,
    singleProduct: SingleProductSlice
  }
})

export default store
