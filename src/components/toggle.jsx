import React from "react";
import "./toggle.css";

const Toggle = ({ name, checked, onChange }) => (
  <label className="switch">
    <input name={name} type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round"></span>
  </label>
);

export default Toggle;
