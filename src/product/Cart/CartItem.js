import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Button from "../../shared/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hook";
import { removeCartItem } from "../../store/cartSlice";
import "./CartItem.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { token, role } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const cartSubmitHandler = async (value) => {
    const { id, price } = props.product || {};
    const formData = new FormData();
    formData.append("id", id);
    formData.append("price", price);
    formData.append("quantity", value);
    await sendRequest(
      "http://127.0.0.1:8000/api/user/cart/store",
      "POST",
      formData,
      {
        Authorization: "Bearer " + token + "|@|" + role,
      }
    );
    dispatch(
      removeCartItem({
        id,
      })
    );
  };

  return (
    <>
      <li className="cart-item">
        <img
          src={`http://127.0.0.1:8000/images/${props.product.image_name}`}
          alt={props.name}
        />
        <ul className="details">
          <li>{props.product.name}</li>
          <li>x{props.cart.quantity}</li>
        </ul>
        <ul className="actions">
          <li>
            &#2547;{props.cart.price.toFixed(2)}
            <span> (&#2547;{props.product.price}/item)</span>
          </li>
          <li>
            <Button onClick={() => cartSubmitHandler(1)} className="action-btn">
              +
            </Button>
            <Button
              onClick={() => cartSubmitHandler(-1)}
              className="action-btn"
            >
              -
            </Button>
          </li>
        </ul>
      </li>
    </>
  );
};

export default CartItem;
