import React, { useState } from "react";

import "./ProductEdit.css";

const ProductEdit = (props) => {
  const [editedValue, setEditedValue] = useState(props.value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    props.handleSave(editedValue);
    setEditedValue(editedValue);
    props.setShowInputEle(false);
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <span>
      {props.showInputEle ? (
        <input
          type="text"
          value={editedValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className="double-click-span hovertext"
          onDoubleClick={() => props.setShowInputEle(true)}
          data-hover="Double click to update"
        >
          {props.value}
        </span>
      )}
    </span>
  );
};

export default ProductEdit;
