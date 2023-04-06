import React, { useCallback, useReducer } from "react";

import "./Auth.css";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {...state.inputs, 
        [action.inputId]:{value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      }
      default:
        return state;
      }
};

const Auth = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

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
        <div className="form" >
          <form onSubmit={authSubmitHandler}>
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
            <Button>Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
