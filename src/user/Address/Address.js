import React from "react";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import Card from "../../components/Card/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_INTEGER_NUMBER,
  VALIDATOR_PHONE_NUMBER,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Address.css";

const Address = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      phone: { value: "", isValid: false },
      post: { value: "", isValid: false },
      road: { value: "", isValid: false },
      village: { value: "", isValid: false },
      district: { value: "", isValid: false },
    },
    false
  );
  return (
    <div className="adderss">
      <form action="">
        <div className="address-input">
          <Input
            id="name"
            placeholder="Name"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
          <Input
            id="phone"
            placeholder="Phone"
            element="input"
            type="number"
            errorText="Please enter a valid phone number."
            validators={[VALIDATOR_PHONE_NUMBER()]}
            onInput={inputHandler}
          />
          <Input
            id="post"
            placeholder="Post"
            element="input"
            type="number"
            errorText="Please enter a valid post number."
            validators={[VALIDATOR_INTEGER_NUMBER()]}
            onInput={inputHandler}
          />
          <Input
            id="road"
            placeholder="Road"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a road."
            onInput={inputHandler}
          />
          <Input
            id="village"
            placeholder="Village"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a address."
            onInput={inputHandler}
          />
          <Input
            id="district"
            placeholder="District"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a district."
            onInput={inputHandler}
          />
        </div>
        <div className="address-button">
          <Button type="submit" disabled={!formState.isValid}>
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Address;
