import React from "react";

import "./Auth.css";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const Auth = () => {
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
          <form action="">
            <Input
              id="email"
              placeholder="E-mail"
              element="input"
              type="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
            />
            <Input
              id="password"
              placeholder="Password"
              element="input"
              type="password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 4 characters."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
