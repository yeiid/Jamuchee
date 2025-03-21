import React from "react";

function Button({ text, onClick, disabled, icon }) {
  return (
    <button
      className={`button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <span data-testid="button-icon" className={`icon-${icon}`}></span>
      )}
      {text}
    </button>
  );
}

export default Button;
