import React from 'react'
import { useSelector } from 'react-redux'

import CartIcon from './CartIcon';
import "./HeaderCart.css";

const HeaderCart = () => {
    const cartQuantity = useSelector(state => state.cart.totalQuantity);
  return (
    <div className='cart-container'>
      <span className="icon">
        <CartIcon />
      </span>
      <span className="badge">{cartQuantity}</span>
    </div>
  )
}

export default HeaderCart