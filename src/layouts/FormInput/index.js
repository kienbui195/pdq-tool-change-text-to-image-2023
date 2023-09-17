import React, { useState } from "react";
import SelectOne from "../../components/SelectOne";
import { customFontList } from "../../ultis/constants";
import Input from "../../components/Input";
import Button from "../../components/Button";

const FormInput = ({ onChange }) => {
  const [setting, setSetting] = useState({
    font: customFontList[0].fontFamily,
    color: "#ffffff",
    lineWidth: 1.5,
    borderColor: "#000000",
  });
  const [fonts, setFonts] = useState(() => customFontList.map((item) => item.fontFamily));

  const handleChange = (val, stateName) => {
    setSetting({
      ...setting,
      [stateName]: val,
    });
  };

  return (
    <div style={{ background: "wheat", padding: "4px", borderRadius: "4px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <SelectOne
          listData={fonts}
          value={setting.font}
          onChange={(val) => handleChange(val, "font")}
          title={"Chọn font"}
        />
        <Input
          title={"Chiều rộng nét bút"}
          value={setting.lineWidth}
          onChange={(val) => handleChange(val, "lineWidth")}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8x" }}>
        <Input title={"Màu chữ"} type={"color"} value={setting.color} onChange={(val) => handleChange(val, "color")} />
        <Input
          title={"Màu viền"}
          type={"color"}
          value={setting.borderColor}
          onChange={(val) => handleChange(val, "borderColor")}
        />
      </div>
      <div>
        <Button title={"Xác nhận"} onClick={() => onChange && onChange(setting)} />
      </div>
    </div>
  );
};

export default FormInput;
