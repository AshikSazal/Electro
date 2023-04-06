import React from "react";
import { NavLink } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.to) {
    return (
      <NavLink to={props.to} exact={props.exact} className="button">
        {props.children}
      </NavLink>
    );
  }
  return (
    <button
      className={`button ${props.inverse && "button--inverse"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
