import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Card from "../../components/Card/Card";
import Button from "../../shared/FormElements/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../shared/hooks/auth-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CartList.css";

const CartList = () => {
  const [loading, setLoading] = useState(true);
  const { token, role } = useAuth();
  const cartProduct = useSelector((state) => state.cart);
  const totalPrice = cartProduct.totalPrice || 0;
  const {isLoading, error, sendRequest, clearError } = useHttpClient();
  const [address, setAddress] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/user/address/fetch",
          "GET",
          null,
          {
            Authorization: "Bearer " + token + "|@|" + role,
          }
        );
        setAddress(responseData.address);
      } catch (err) {}
    };
    fetchProduct();
  }, [setAddress, sendRequest, token, role]);
  
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
        <div className="check-address-out check">
          {!address && <div className="check-address check">
            <div><h3>You didn't provide your address. Please fill-up the address form</h3></div>
            <div><Button to={"/address"} className="no-product__button">Click Here</Button></div>
          </div>}
          <div className="check-out check">
            <div>Your total price: {totalPrice.toFixed(2)}</div>
            <div>
              <Button disabled={!address}>Check out</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
