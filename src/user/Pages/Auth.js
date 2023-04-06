import React, { useState } from "react";

import "./Auth.css";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // it will work in sign in mood
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // It will work in sign up mood
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="top-container">
          <div className="back-drop"></div>
          <div className="header-container">
            <h2 className="header-text">Welcome</h2>
            <h2 className="header-text">back</h2>
            <h5 className="small-text">Please sign in to continue</h5>
          </div>
        </div>
        <div className="form">
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                id="name"
                placeholder="Name"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            <Input
              id="email"
              placeholder="E-mail"
              element="input"
              type="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              id="password"
              placeholder="Password"
              element="input"
              type="password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 4 characters."
              onInput={inputHandler}
            />
            <Button disabled={!formState.isValid}>
              {isLoginMode ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            Click here to {isLoginMode ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
