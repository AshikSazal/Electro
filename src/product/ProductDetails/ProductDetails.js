import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/Error/ErrorModal";
import Button from "../../shared/FormElements/Button";
import Modal from "../../components/Error/Modal";
import ShowRating from "./ShowRating";
import GiveRating from "./GiveRating";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { addItem } from "../ProductItem";
import { useAuth } from "../../shared/hooks/auth-hook";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn, token, role } = useAuth();
  const [product, setProduct] = useState({});
  const [commentRating, setCommentRating] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://127.0.0.1:8000/api/product/fetch/${id}`,
          "GET",
          null
        );
        setProduct(responseData.product);
        // setCommentRating(responseData.commentRating);
      } catch (err) {}
    };
    fetchProduct();
  }, [id, setProduct, sendRequest, category]);

  const showWarningHandler = () => {
    document.body.style.overflow = 'hidden';
    setShowConfirmModal(true);
  };

  const cancelWarningHandler = () => {
    document.body.style.overflow = '';
    setShowConfirmModal(false);
  };

  const addItemHandler = async () => {
    addItem(product.id, product.price, token, role, dispatch, sendRequest);
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelWarningHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p className="log-in">Please Login first</p>
      </Modal>
      <div className="product-all-details-info">
        <div className="product-details">
          <div className="product-details__image">
            <img
              className="product--image"
              src={`http://127.0.0.1:8000/images/${product.image_name}`}
              alt={product.name}
            />
          </div>
          <div className="product-details-info-button">
            <div className="product-details__info">
              <h1>{product.name}</h1>
              <h3>{product.brand}</h3>
              <h3>{product.price}</h3>
              <h3>
                <ShowRating rating={0.5} />
              </h3>
            </div>
            <div>
              <Button
                className="add-to-cart"
                onClick={isLoggedIn ? addItemHandler : showWarningHandler}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="product-description">
          <h1>Prduct details of {product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <GiveRating />
    </>
  );
};

export default ProductDetails;
