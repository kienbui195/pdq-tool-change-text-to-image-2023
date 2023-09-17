import React from "react";

const Textarea = ({ error, value, onChange, onFocus }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <textarea
        style={{
          minHeight: "60px",
          padding: "10px",
          border: error ? `1px solid red` : "1px solid gray",
        }}
        value={value}
        onChange={(ev) => onChange && onChange(ev.target.value)}
        onFocus={() => onFocus && onFocus()}
      />
      {error && <span style={{ color: "red", fontSize: "14px" }}>{error}</span>}
    </div>
  );
};

export default Textarea;
