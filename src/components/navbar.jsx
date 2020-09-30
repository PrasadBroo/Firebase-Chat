import React from "react";



export default function Navbar(props) {
  return (
    <React.Fragment>
        <nav>
          <h1>
            <a href="index.html">Firebase Chat</a>
          </h1>
          {props.signout ? <button onClick={props.signOut}>Sign Out</button>:null}
        </nav>
      </React.Fragment>
  )
}
