import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={`button ${props.className}`}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button ${props.style} ${props.inverse && "button--inverse"} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
