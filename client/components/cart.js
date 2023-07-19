import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Cart = () => {
  return (
    <div>
      {
        //if logged in get items for that user
        //otherwise do the steps below to show table of products from local storage
        //put a table with all the user products in here
        //each product will also have the option to change quantity
        //or remove the product all together from the cart
      }
      {
        //at the end of the page add a checkout button
      }
    </div>
  )
}

export default Cart
