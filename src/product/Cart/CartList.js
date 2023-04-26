import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Card from "../../components/Card/Card";
import Button from "../../shared/FormElements/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./CartList.css";

const CartList = () => {
  const [loading, setLoading] = useState(true);
  const cartProduct = useSelector((state) => state.cart);
  const totalPrice = cartProduct.totalPrice || 0;

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1000); // set a delay of 1000ms
  
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner asOverlay />;
  }

  if (totalPrice <= 0) {
    return (
      <>
        {loading && <LoadingSpinner asOverlay />}
        <div className="no-product">
          <div className="no-product__selected">There is no cart item</div>
          <div>
            <Button className="no-product__button" to={"/product/all"}>
              Click Here To Shopping
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      <div className="cart-product">
        <div className="cart-list">
          <ul>
            <Card>
              <div>
                {cartProduct.items.map((item, index) => (
                  <CartItem
                    key={index}
                    cart={item.cart}
                    product={item.product}
                  />
                ))}
              </div>
            </Card>
          </ul>
        </div>
        <div className="check-out">
          <div>
            Your total price:{" "}
            {totalPrice.toFixed(2)}
          </div>
          <div>
            <Button>Check out</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
