import React from "react";

import Input from "../../../shared/FormElements/Input";
import ImageUpload from "../../../shared/FormElements/ImageUpload";
import Button from "../../../shared/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_QUANTITY_NUMBER,
  VALIDATOR_REQUIRE,
  VALIDATOR_PRICE_NUMBER,
} from "../../../shared/util/validators";
import "./UploadProduct.css";

const UploadProduct = () => {
  return (
    <div className="upload">
      <form action="">
        <div className="input-upload">
          <div>
            <Input
              id="name"
              placeholder="Name"
              element="input"
              type="text"
              errorText="Please enter a name."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={() => {}}
            />
            <Input
              id="brand"
              placeholder="Brand"
              element="input"
              type="text"
              errorText="Please enter a brand name."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={() => {}}
            />
            <Input
              id="category"
              placeholder="Category"
              element="input"
              type="text"
              errorText="Please enter a category."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={() => {}}
            />
            <Input
              id="price"
              placeholder="Price"
              element="input"
              type="number"
              errorText="Please enter a valid price."
              validators={[VALIDATOR_PRICE_NUMBER()]}
              onInput={() => {}}
            />
            <Input
              id="quantity"
              placeholder="Quantity"
              element="input"
              type="number"
              errorText="Please enter a valid quantity."
              validators={[VALIDATOR_QUANTITY_NUMBER()]}
              onInput={() => {}}
            />
            <Input
              id="name"
              placeholder="Description"
              element="textarea"
              cols="40"
              type="text"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid description (at least 5 character)."
              onInput={() => {}}
            />
          </div>
          <div>
            <ImageUpload
              center
              id="image"
              onInput={() => {}}
              errorText="Please provide an image."
            />
          </div>
        </div>
        <div>
          <Button type="submit">ADD PRODUCT</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
