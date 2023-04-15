import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Error/Modal";
import { useAuth } from "../../shared/hooks/auth-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/FormElements/Button";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(true);

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    navigate("/auth");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-first__container">
        <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Log In?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button class="login-first__button" inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p className="login-first__p">Please Login First</p>
      </Modal>
      </div>
    );
  }

  return <div>Cart</div>;
};

export default Cart;
