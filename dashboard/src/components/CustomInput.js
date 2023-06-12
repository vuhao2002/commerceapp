import React from "react";
import { Input } from "antd";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, value, onChange, onBlur } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
