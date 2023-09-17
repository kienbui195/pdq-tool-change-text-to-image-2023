import React from "react";

const ColorInput = ({ value, onChange, title }) => {
  return (
    <label style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
      <p>{title}</p>
      <input
        style={{ marginLeft: "8px" }}
        type="color"
        value={value}
        onChange={(ev) => {
          onChange && onChange(ev.target.value);
        }}
      />
    </label>
  );
};

export default ColorInput;
