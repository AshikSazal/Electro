import React from "react";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Card from "../../components/Card/Card";
import "./CartList.css";

const CartList = () => {
  const cartProduct = useSelector((state) => state.cart.items);
  return (
    <div className="cart-product">
      <div className="cart-list">
        <ul>
          <Card>
            <div>
              {cartProduct.map((item) => (
                <CartItem
                  key={item.product.id}
                  cart={item.cart}
                  product={item.product}
                />
              ))}
            </div>
          </Card>
        </ul>
      </div>
      <div className="check-out">
        <div></div>
        <div>Check out</div>
      </div>
    </div>
  );
};

export default CartList;
