import React from "react";

import Input from "../../../shared/FormElements/Input";
import ImageUpload from '../../../shared/FormElements/ImageUpload';
import "./UploadProduct.css";

const UploadProduct = () => {
  return (
    <div className="upload">
      <div>
      <Input
        id="name"
        placeholder="Name"
        element="input"
        type="text"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      <Input
        id="brand"
        placeholder="Brand"
        element="input"
        type="text"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      <Input
        id="category"
        placeholder="Category"
        element="input"
        type="text"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      <Input
        id="price"
        placeholder="Price"
        element="input"
        type="number"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      <Input
        id="quantity"
        placeholder="Quantity"
        element="input"
        type="number"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      <Input
        id="name"
        placeholder="Name"
        element="textarea"
        cols="40"
        type="text"
        errorText="Please enter a name."
        onInput={() => {}}
      />
      </div>
      <div>
      <ImageUpload
              center
              id="image"
              onInput={()=>{}}
              errorText="Please provide an image."
            />
      </div>
    </div>
  );
};

export default UploadProduct;
