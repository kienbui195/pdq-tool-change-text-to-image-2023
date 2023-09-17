import React, { useState } from "react";
import { BUTTON_COLOR } from "../ultis/constants";

const Button = ({ title, onClick, type = "primary" }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        padding: "4px 10px",
        background: `${BUTTON_COLOR[type]}`,
        margin: "4px",
        borderRadius: "4px",
        cursor: "pointer",
        opacity: hover ? 0.7 : 1,
        boxShadow: hover ? "2px 2px 2px #000" : "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick && onClick()}
    >
      {title}
    </div>
  );
};

export default Button;
