import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

import Button from "../../../../shared/FormElements/Button";
import Modal from "../../../../components/Error/Modal";
import ErrorModal from "../../../../components/Error/ErrorModal";
import ProductEdit from "./ProductEdit";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useAuth } from "../../../../shared/hooks/auth-hook";
import "./AdminProductItem.css";

const AdminProductItem = (props) => {
  const [showInputPrice, setShowInputPrice] = useState(false);
  const [showInputQuantity, setShowInputQuantity] = useState(false);

  const { token, role } = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://127.0.0.1:8000/api/product/delete/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + token + "|@|" + role,
        }
      );
    } catch (err) {}
    props.onDelete(props.id);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this product? Please note that is
          can't be undone there after
        </p>
      </Modal>
      <tr>
        <td>
          <img
            src={`http://127.0.0.1:8000/images/${props.image}`}
            alt={props.name}
          />
        </td>
        <td>{props.name}</td>
        <td>{props.brand}</td>
        <td>{props.category}</td>
        {/* <td>{props.price}</td> */}
        <td><ProductEdit
          key={props.id}
          value={props.price}
          handleSave={(value) =>props.editProductHandler(props.id,value,"price")}
          setShowInputEle={setShowInputPrice}
          showInputEle={showInputPrice}
        /></td>
        <td><ProductEdit
          key={props.id}
          value={props.quantity}
          handleSave={(value) =>props.editProductHandler(props.id,value,"quantity")}
          setShowInputEle={setShowInputQuantity}
          showInputEle={showInputQuantity}
        /></td>
        {/* <td>{props.quantity}</td> */}
        <td>
          <div>{props.description}</div>
        </td>
        <td>
          <Button className="delete" danger onClick={showDeleteWarningHandler}>
            <DeleteForeverSharpIcon />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default AdminProductItem;
