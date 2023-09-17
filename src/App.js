import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import { customFontList } from "./ultis/constants";
import { loadCustomFonts } from "./ultis/function";

const App = () => {
  const [numberInput, setNumberInput] = useState("");
  const [form, setForm] = useState([]);
  const [modal, setModal] = useState(false);
  const [canvas, setCanvas] = useState([]);
  const [font, setFont] = useState(customFontList[0].fontFamily)
  const [setting, setSetting] = useState({
    color: '',
    lineWidth: 1.5,
    borderColor: ''
  })

  const handleAddField = () => {
    if (+numberInput > 0) {
      let array = [];
      for (let i = 0; i < +numberInput; i++) {
        array.push({ id: i, value: "", error: "", canvas: "" });
      }
      setForm(array);
    } else {
      setForm([]);
    }
  };



  const drawCanvas = () => {
    const canvasList = [];

    form.forEach((item, idx) => {
      const { value } = item;

      if (value.trim() !== "") {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 260;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `italic bold 50px ${font}, Arial`;
        ctx.fillStyle = `${setting.color}`;
        ctx.strokeStyle = setting.borderColor;
        ctx.textSpacing = 1
        ctx.lineWidth = +setting.lineWidth;
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
            <img src={dataURL} alt={`Text ${idx}`} style={{ backgroundColor: "transparent", width: "100%" }} />
            <div style={{ textAlign: "center" }}>
              <a href={dataURL} download={`text_${idx}.png`}>
                Tải về
              </a>
            </div>
          </div>
        );
      }
    });

    return canvasList;
  };

  const checkError = () => {
    let flag = [];
    form.forEach((item) => {
      if (item.value.length > 75) {
        flag.push(1);
      }
    });
    return flag.length > 0;
  };

  const handleCreate = () => {
    if (checkError()) {
      setForm((prev) =>
        prev.map((item, i) => (item.value.length > 75 ? { ...item, error: "Bạn cần nhập ít hơn 75 kí tự" } : item))
      );
    } else {
      let canvas = [];
      form.forEach((item) => {
        if (item.value !== "") {
          canvas.push();
        }
      });
      setCanvas(drawCanvas());
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label>
            <span style={{ marginRight: "8px" }}>Nhập số ô text:</span>
            <input
              type="number"
              placeholder="chọn từ 0 đến 10"
              value={numberInput}
              onChange={(ev) => setNumberInput(ev.target.value)}
            />
          </label>
          <Button title={"Tạo"} onClick={handleAddField} />
          {form.length > 0 && <Button type="success" title={"Converter"} onClick={handleCreate} />}
          <select onChange={(ev) => {
            setFont(ev.target.value)
          }}>
            {customFontList.map((item, idx) => {
              const { fontFamily } = item
              return (
                <option key={idx} value={fontFamily} selected={font === fontFamily}>{fontFamily}</option>
              )
            })}
          </select>
          <label style={{display: 'flex' , alignItems: 'center',  marginLeft: '8px'}}>
            <p>Màu chữ</p>
            <input style={{ marginLeft: '8px' }} type="color" value={setting.color} onChange={(ev) => {
              setSetting({
                ...setting,
                color: ev.target.value
              })
            }} />
          </label>
          <input style={{ marginLeft: '8px' }} placeholder="Độ rộng viền" type="number" value={setting.lineWidth} onChange={ev => {
            setSetting({
              ...setting,
              lineWidth: ev.target.value
            })
          }} />
          <label style={{display: 'flex' , alignItems: 'center',  marginLeft: '8px'}}>
            <p>Màu viền</p>
            <input style={{ marginLeft: '8px' }} placeholder="Màu Viền" type="color" value={setting.borderColor} onChange={ev => {
              setSetting({
                ...setting,
                borderColor: ev.target.value
              })
            }} />
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "8px" }}>
          {form.map((_i, idx) => {
            const { id, value, error } = _i;
            return (
              <div key={id} style={{ display: "flex", flexDirection: "column" }}>
                <textarea
                  style={{
                    minHeight: "60px",
                    padding: "10px",
                    border: error ? `1px solid red` : "1px solid gray",
                  }}
                  value={value}
                  onChange={(ev) =>
                    setForm((prev) => prev.map((item, i) => (i === idx ? { ...item, value: ev.target.value } : item)))
                  }
                  onFocus={() =>
                    setForm((prev) => prev.map((_it, _idx) => (_idx === idx ? { ..._it, error: "" } : _it)))
                  }
                />
                {error && <span style={{ color: "red", fontSize: "14px" }}>Cần nhập ít hơn 75 kí tự</span>}
              </div>
            );
          })}
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
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "auto",
              maxHeight: "480px",
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
