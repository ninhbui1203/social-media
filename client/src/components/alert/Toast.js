import React from "react";

function Toast({ bgColor, msg, handleShow }) {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close text-light"
          data-dimiss="toast"
          aria-label="Close"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  );
}

export default Toast;
