import React from "react";

const Input = ({ title, type, value, onChange }) => {
  return (
    <label style={{ margin: "8px", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
      <p style={{ fontStyle: "italic", fontWeight: 700, margin: 0 }}>{title}</p>
      <input
        style={{ padding: "4px", outline: "none" }}
        type={type || "text"}
        value={value}
        onChange={(ev) => onChange && onChange(ev.target.value)}
      />
    </label>
  );
};

export default Input;
