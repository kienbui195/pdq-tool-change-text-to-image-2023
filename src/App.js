import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import { customFontList } from "./ultis/constants";
import { loadCustomFonts } from "./ultis/function";
import Input from "./components/Input";
import FormInput from "./layouts/FormInput";
import Textarea from "./components/Textarea";

const App = () => {
  const [numberInput, setNumberInput] = useState(0);
  const [modal, setModal] = useState(false);
  const [canvas, setCanvas] = useState([]);
  const [setting, setSetting] = useState({
    item1: {
      setting: {
        font: customFontList[0].fontFamily,
        color: "",
        lineWidth: 0.5,
        borderColor: "",
      },
      items: [],
    },
    item2: {
      setting: { font: customFontList[0].fontFamily, color: "", lineWidth: 0.5, borderColor: "" },
      items: [],
    },
    item3: {
      setting: { font: customFontList[0].fontFamily, color: "", lineWidth: 0.5, borderColor: "" },
      items: [],
    },
    item4: {
      setting: { font: customFontList[0].fontFamily, color: "", lineWidth: 0.5, borderColor: "" },
      items: [],
    },
  });

  const handleAddField = () => {
    if (+numberInput > 0) {
      let array = [];
      for (let i = 0; i < +numberInput; i++) {
        array.push({ id: i, value: "", error: "" });
      }
      setSetting({
        ...setting,
        item1: {
          ...setting.item1,
          items: array,
        },
        item2: {
          ...setting.item2,
          items: array,
        },
        item3: {
          ...setting.item3,
          items: array,
        },
        item4: {
          ...setting.item4,
          items: array,
        },
      });
    }
  };

  const handleChange = (val, stateName, item, idx) => {
    setSetting({
      ...setting,
      [item]: {
        ...setting[item],
        items: setting[item].items.map((_i, _idx) => (_idx === idx ? { ..._i, [stateName]: val } : _i)),
      },
    });
  };

  const handleSaveSettings = (val, item) => {
    setSetting({
      ...setting,
      [item]: {
        ...setting[item],
        setting: val,
      },
    });
  };

  const drawCanvas = (list, font, color, lineWidth, borderColor, name) => {
    const canvasList = [];

    list.forEach((item, idx) => {
      const { value } = item;

      // if (value.trim() !== "") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 260;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `italic bold 50px ${font}, Arial`;
      ctx.fillStyle = color;
      ctx.strokeStyle = borderColor;
      ctx.textSpacing = 1;
      ctx.lineWidth = +lineWidth;
      const maxTextWidth = 700;
      let textX = canvas.width / 2; // Vị trí can giữa ngang
      let textY = canvas.height / 2; // Vị trí can giữa theo chiều dọc
      const words = value.split(" ");
      let line = "";
      for (const word of words) {
        const testLine = line + (line === "" ? "" : " ") + word;
        const testLineWidth = ctx.measureText(testLine).width;

        if (testLineWidth > maxTextWidth) {
          ctx.fillText(line, textX, textY);
          ctx.strokeText(line, textX, textY);
          line = word;
          textY += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, textX, textY);
      ctx.strokeText(line, textX, textY);
      const dataURL = canvas.toDataURL("image/png");

      canvasList.push(
        <div key={idx} style={{ border: "2px solid black", boxSizing: "border-box" }}>
          <img
            src={dataURL}
            alt={`Text ${idx}`}
            style={{ backgroundColor: "transparent", width: "100%", objectFit: "cover" }}
          />
          <div style={{ textAlign: "center" }}>
            <a href={dataURL} download={`${name}${idx}.png`}>
              {`${name}${idx}`}
            </a>
          </div>
        </div>
      );
      // }
    });

    return canvasList;
  };

  const checkError = () => {
    let flag = [];

    const checkItems = (items) => {
      items.forEach((_i) => {
        if (_i.value.length > 75) {
          flag.push(1);
        }
      });
    };

    checkItems(setting.item1.items);
    checkItems(setting.item2.items);
    checkItems(setting.item3.items);
    checkItems(setting.item4.items);

    return flag.length > 0;
  };

  const handleCreate = () => {
    const canvasList = [];

    if (checkError()) {
      const updatedSetting = { ...setting };

      // Function to handle errors and update the error message
      const handleItemError = (item) => {
        if (item.value.length > 75) {
          return { ...item, error: "Bạn cần nhập ít hơn 75 kí tự" };
        }
        return item;
      };

      // Loop through and update item arrays
      ["item1", "item2", "item3", "item4"].forEach((itemKey) => {
        updatedSetting[itemKey].items = updatedSetting[itemKey].items.map(handleItemError);
      });

      setSetting(updatedSetting);
    } else {
      ["item1", "item2", "item3", "item4"].forEach((itemKey) => {
        const canvas = [];
        setting[itemKey].items.forEach((item) => {
          canvas.push(item);
        });
        const draw = drawCanvas(
          canvas,
          setting[itemKey].setting.font,
          setting[itemKey].setting.color,
          setting[itemKey].setting.lineWidth,
          setting[itemKey].setting.borderColor,
          `${itemKey}`
        );
        if (draw.length > 0) {
          canvasList.push(...draw);
        }
      });

      setCanvas(canvasList);
      setModal(true);
    }
  };

  useEffect(() => {
    loadCustomFonts(customFontList);
  }, []);

  return (
    <div
      style={{
        padding: "30px 50px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h2>Text to png converter</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: `auto auto ${setting.item1.items.length > 0 ? "auto" : ""}` }}
        >
          <Input title="Nhập số hàng" value={numberInput} onChange={(val) => setNumberInput(val)} />
          <Button title={"Tạo"} onClick={handleAddField} />
          {setting.item1.items.length > 0 && <Button type="success" title={"Converter"} onClick={handleCreate} />}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", gap: "8px" }}>
          {setting.item1.items.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <FormInput
                onChange={(val) => {
                  handleSaveSettings(val, "item1");
                }}
              />
              {setting.item1.items.map((_i, idx) => {
                const { id, error, value } = _i;
                return (
                  <Textarea
                    error={error}
                    key={id}
                    value={value}
                    onChange={(val) => {
                      handleChange(val, "value", "item1", idx);
                    }}
                    onFocus={() =>
                      setSetting({
                        ...setting,
                        item1: {
                          ...setting.item1,
                          items: setting.item1.items.map((_it, _idx) => (_idx === idx ? { ..._it, error: "" } : _it)),
                        },
                      })
                    }
                  />
                );
              })}
            </div>
          )}
          {setting.item2.items.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <FormInput onChange={(val) => handleSaveSettings(val, "item2")} />
              {setting.item2.items.map((_i, idx) => {
                const { id, error, value } = _i;
                return (
                  <Textarea
                    error={error}
                    key={id}
                    value={value}
                    onChange={(val) => {
                      handleChange(val, "value", "item2", idx);
                    }}
                    onFocus={() =>
                      setSetting({
                        ...setting,
                        item2: {
                          ...setting.item2,
                          items: setting.item2.items.map((_it, _idx) => (_idx === idx ? { ..._it, error: "" } : _it)),
                        },
                      })
                    }
                  />
                );
              })}
            </div>
          )}
          {setting.item3.items.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <FormInput onChange={(val) => handleSaveSettings(val, "item3")} />
              {setting.item3.items.map((_i, idx) => {
                const { id, error, value } = _i;
                return (
                  <Textarea
                    error={error}
                    key={id}
                    value={value}
                    onChange={(val) => {
                      handleChange(val, "value", "item3", idx);
                    }}
                    onFocus={() =>
                      setSetting({
                        ...setting,
                        item3: {
                          ...setting.item3,
                          items: setting.item3.items.map((_it, _idx) => (_idx === idx ? { ..._it, error: "" } : _it)),
                        },
                      })
                    }
                  />
                );
              })}
            </div>
          )}
          {setting.item4.items.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <FormInput onChange={(val) => handleSaveSettings(val, "item4")} />
              {setting.item4.items.map((_i, idx) => {
                const { id, error, value } = _i;
                return (
                  <Textarea
                    error={error}
                    key={id}
                    value={value}
                    onChange={(val) => {
                      handleChange(val, "value", "item4", idx);
                    }}
                    onFocus={() =>
                      setSetting({
                        ...setting,
                        item4: {
                          ...setting.item4,
                          items: setting.item4.items.map((_it, _idx) => (_idx === idx ? { ..._it, error: "" } : _it)),
                        },
                      })
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Drawer
        open={modal}
        onClose={() => setModal(false)}
        title="Danh sách ảnh"
        subTitle="Click vào ảnh để tải về"
        modalWidth="900px"
        children={
          <div
            style={{
              padding: "16px",
              display: "grid",
              overflow: "hidden",
              overflowY: "auto",
              maxHeight: "600px",
              gridTemplateColumns: "auto auto auto auto",
              gap: "2px",
            }}
          >
            {canvas.map((item, i) => {
              return <div key={i}>{item}</div>;
            })}
          </div>
        }
      />
    </div>
  );
};

export default App;
