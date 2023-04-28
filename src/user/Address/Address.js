import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_INTEGER_NUMBER,
  VALIDATOR_PHONE_NUMBER,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hook";
import ErrorModal from "../../components/Error/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Address.css";

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data ?? {};
  const { token, role } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const addressSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("phone", formState.inputs.phone.value);
    formData.append("post", formState.inputs.post.value);
    formData.append("road", formState.inputs.road.value);
    formData.append("village", formState.inputs.village.value);
    formData.append("district", formState.inputs.district.value);
    try {
      await sendRequest(
        "http://127.0.0.1:8000/api/user/address/store",
        "POST",
        formData,
        {
          Authorization: "Bearer " + token + "|@|" + role,
        }
      );
    } catch (err) {}
    navigate("/product/cart");
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="adderss">
        <form onSubmit={addressSubmitHandler}>
          <div className="address-input">
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="name"
              placeholder="Name"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
              initialValue={data?.address?.name || ''}
              initialValid={!!data?.address?.name}
            />
            <Input
              id="phone"
              placeholder="Phone"
              element="input"
              type="text"
              errorText="Please enter a valid phone number."
              validators={[VALIDATOR_PHONE_NUMBER()]}
              onInput={inputHandler}
              initialValue={data?.address?.phone || ''}
              initialValid={!!data?.address?.phone}
            />
            <Input
              id="post"
              placeholder="Post"
              element="input"
              type="text"
              errorText="Please enter a valid post number."
              validators={[VALIDATOR_INTEGER_NUMBER()]}
              onInput={inputHandler}
              initialValue={data?.address?.post || ''}
              initialValid={!!data?.address?.post}
            />
            <Input
              id="road"
              placeholder="Road"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your road name."
              onInput={inputHandler}
              initialValue={data?.address?.road || ''}
              initialValid={!!data?.address?.road}
            />
            <Input
              id="village"
              placeholder="Village"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your village name."
              onInput={inputHandler}
              initialValue={data?.address?.village || ''}
              initialValid={!!data?.address?.village}
            />
            <Input
              id="district"
              placeholder="District"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your district name."
              onInput={inputHandler}
              initialValue={data?.address?.district || ''}
              initialValid={!!data?.address?.district}
            />
          </div>
          <div className="address-button">
            <Button type="submit" disabled={!formState.isValid}>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
