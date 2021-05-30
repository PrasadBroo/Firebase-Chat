import React from "react";

export default function chatMsg(props) {
  return props.type !== "image" ? (
    <>
      <div className={`user-msg ` + props.what}>
        <div className="dumb"></div>
        <div className="wrapper">
          <img src={props.image} className="userProfile" alt="user" />
          <p>{props.msg}</p>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={`user-msg ` + props.what}>
        <div className="dumb"></div>
        <div className="wrapper">
          <img src={props.image} className="userProfile" alt="user" />
          <div
            className="image"
            onClick={() => handelImagePopup(props.displayImg)}
          >
            <img
              src={props.displayImg}
              alt="displayPhoto"
              className="imageAsMessgae"
            />
          </div>
        </div>
      </div>
    </>
  );

  function handelImagePopup(url) {
    props.handelPopup(url);
  }
}
