import React from "react";
import "./toggle.css";

const Toggle = ({ text, name, checked, onChange }) => (
  <label style={{ display: "flex", justifyContent: "space-between" }}>
    {text}
    <div className="switch">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider round"></span>
    </div>
  </label>
);

export default Toggle;
