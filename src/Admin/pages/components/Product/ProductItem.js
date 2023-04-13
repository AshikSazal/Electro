import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import "./ProductItem.css";

const ProductItem = (props) => {
  return (
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
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <td><div>{props.description}</div></td>
      <td>
        <EditIcon />
      </td>
      <td>
        <DeleteForeverSharpIcon />
      </td>
    </tr>
  );
};

export default ProductItem;
