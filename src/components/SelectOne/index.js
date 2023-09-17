import React from "react";

const SelectOne = ({ title, value, onChange, listData }) => {
  return (
    <label style={{ margin: "4px", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
      <p style={{ fontStyle: "italic", fontWeight: 700, margin: 0 }}>{title}</p>
      <select
        style={{ padding: "4px" }}
        onChange={(ev) => {
          onChange && onChange(ev.target.value);
        }}
      >
        {listData.map((item, idx) => {
          return (
            <option key={idx} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectOne;
