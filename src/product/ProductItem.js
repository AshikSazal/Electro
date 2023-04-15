import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../shared/FormElements/Button";
import Card from "../components/Card/Card";
import { addItemToCart } from "../store/cartSlice";
import Modal from "../components/Error/Modal";
import { useAuth } from "../shared/hooks/auth-hook";
import "./ProductItem.css";

const ProductItem = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    navigate("/auth");
  };

  const { id, category, price } = props.item;

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        price,
      })
    );
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p className="log-in">
          Please Login first
        </p>
      </Modal>
      <Card>
        <div className="hov">
          <div className="read">
            <p>
              <Button to={`/product/${props.item.category}/${props.item.id}`}>
                Read More
              </Button>
            </p>
            <p>
              <Button
                onClick={isLoggedIn ? addItemHandler : showDeleteWarningHandler}
              >
                Add to Cart
              </Button>
            </p>
          </div>
          <div key={props.item.id}>
            <img className="product--image" src={props.item.imageurl} alt="" />
            <h2>{props.item.name}</h2>
            <p className="price">{props.item.price}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductItem;
