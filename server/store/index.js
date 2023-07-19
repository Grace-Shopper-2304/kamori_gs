import {configureStore} from '@reduxjs/toolkit'
import allProductsSlice from './allProductsSlice'
import singleProductSlice from './singleProductSlice'

const store = configureStore({
  reducer: {
    products: allProductsSlice,
    singleProduct: singleProductSlice
  }
})

export default store
