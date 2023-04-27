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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [address, setAddress] = useState();
  console.log(cartProduct)
  console.log(totalPrice)

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

  if (totalPrice <= 0) {
    return (
      <>
        {isLoading && <LoadingSpinner asOverlay />}
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

  if (!totalPrice) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
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
          {!address ? (
            <div className="check-address check">
              <div>
                <h3>
                  You didn't provide your address. Please fill-up the address
                  form
                </h3>
              </div>
              <div>
                <Button to={"/address"} className="no-product__button">
                  Click Here
                </Button>
              </div>
            </div>
          ) : (
            <div className="check-address check">
              <div className="check-address-table">
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{address.name}</td>
                    </tr>
                    <tr>
                      <td>Post Code:</td>
                      <td>{address.post}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>{address.phone}</td>
                    </tr>
                    <tr>
                      <td>Road:</td>
                      <td>{address.road}</td>
                    </tr>
                    <tr>
                      <td>Village:</td>
                      <td>{address.village}</td>
                    </tr>
                    <tr>
                      <td>District:</td>
                      <td>{address.district}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <Button
                  to={`address/${address}`}
                  className="no-product__button"
                >
                  Update
                </Button>
              </div>
            </div>
          )}
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
