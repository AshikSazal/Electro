import React from "react";

import "./Auth.css";
import Input from "../../shared/FormElements/Input";

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
              <Input id="name" placeholder='E-mail' elements="input" type="text" />
              <Input id="email" placeholder='Password' elements="email" type="email" />
            </form>
          </div>
      </div>
    </div>
  );
};

export default Auth;
