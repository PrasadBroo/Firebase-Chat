import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState } from "react";

export default function ChatMsg(props) {
  const [isimageLoaded, setisimageLoaded] = useState(false);

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
              hidden={!isimageLoaded}
              className="imageAsMessgae"
              onLoad={() => imageLoaded()}
            />
            {!isimageLoaded ? (
              <Skeleton
                variant="rect"
                width={210}
                height={118}
                style={{ backgroundColor: "#fff" }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  function handelImagePopup(url) {
    props.handelPopup(url);
  }

  function imageLoaded() {
    setisimageLoaded(true);
  }
}
