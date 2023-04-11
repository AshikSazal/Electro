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
import { useForm } from "../../../shared/hooks/form-hook";
import "./UploadProduct.css";

const UploadProduct = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      brand: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      quantity: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const productSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("brand", formState.inputs.brand.value);
    formData.append("category", formState.inputs.category.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("quantity", formState.inputs.quantity.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);
  };
  return (
    <div className="upload">
      <form onSubmit={productSubmitHandler}>
        <div className="input-upload">
          <div>
            <Input
              id="name"
              placeholder="Name"
              element="input"
              type="text"
              errorText="Please enter a name."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input
              id="brand"
              placeholder="Brand"
              element="input"
              type="text"
              errorText="Please enter a brand name."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input
              id="category"
              placeholder="Category"
              element="input"
              type="text"
              errorText="Please enter a category."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input
              id="price"
              placeholder="Price"
              element="input"
              type="number"
              errorText="Please enter a valid price."
              validators={[VALIDATOR_PRICE_NUMBER()]}
              onInput={inputHandler}
            />
            <Input
              id="quantity"
              placeholder="Quantity"
              element="input"
              type="number"
              errorText="Please enter a valid quantity."
              validators={[VALIDATOR_QUANTITY_NUMBER()]}
              onInput={inputHandler}
            />
            <Input
              id="description"
              placeholder="Description"
              element="textarea"
              cols="40"
              type="text"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid description (at least 5 character)."
              onInput={inputHandler}
            />
          </div>
          <div>
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          </div>
        </div>
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD PRODUCT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
