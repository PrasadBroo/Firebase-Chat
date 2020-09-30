import React from "react";
import '../css/signin.css';

export default function Signin(props) {
  return (
    <div className="sign-in">
      <button onClick={props.signin}>
        Sign In With Google
      </button>
    </div>
  );
}
