import React, { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const Drawer = ({
  open = false,
  onClose,
  children,
  modalWidth = "400px",
  title = "Header",
  subTitle = "Viet gi do",
}) => {
  const boxRef = useRef(null);
  let timer;
  const [flag, setFlag] = useState(false);

  const handleClose = () => {
    setFlag(false);
    clearTimeout(timer);
    timer = setTimeout(() => {
      onClose && onClose();
    }, 500);
  };

  useEffect(() => {
    if (open) {
      setFlag(true);
    }
  }, [open]);

  return (
    <div
      style={{
        position: "fixed",
        display: open ? "block" : "none",
        top: 0,
        right: 0,
        zIndex: 99,
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ width: "100%", height: "100%", background: "#ccbdbd", opacity: 0.7 }} onClick={handleClose}></div>
      <div
        ref={boxRef}
        style={{
          height: "100%",
          width: modalWidth,
          position: "absolute",
          top: 0,
          right: flag ? +`-${modalWidth.replace("px", "")}` : 0,
          padding: "10px 16px",
          background: "#fff",
          zIndex: 999,
        }}
        className={flag ? s.slideLeft : s.slideRight}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px",
              marginBottom: "16px",
            }}
          >
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <h4 style={{ fontWeight: 600, fontSize: "24px", margin: "8px 0" }}>{title}</h4>
              <p style={{ margin: 0 }}>{subTitle}</p>
            </div>
            <div
              style={{
                cursor: "pointer",
                height: "100%",
                width: "40px",
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleClose}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  background: "#7e7373",
                  opacity: 0.8,
                  borderRadius: "50%",
                }}
              >
                X
              </div>
            </div>
            <hr />
          </div>
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
