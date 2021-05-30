import React from "react";
import "../css/imageModel.css";
export default function ImageModel(props) {
  return (
    <div className={props.display ? "imageViewer" : "imageViewer none"}>
      <div
        id="myModal"
        className={props.display ? "modal show-modal" : "modal"}
      >
        <span
          className="close"
          onClick={() => {
            props.hidepopup();
          }}
        >
          &times;
        </span>
        <img
          className="modal-content"
          src={props.displayPopupImageUrl ? props.displayPopupImageUrl : undefined}
          alt="yoyo"
          id="img01"
        ></img>
      </div>
    </div>
  );
}
