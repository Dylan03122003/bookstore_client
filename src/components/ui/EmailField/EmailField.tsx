import React, { ChangeEvent, useState } from "react";
import styles from "./EmailField.module.css";

type EmailFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  backgroundColor?: string;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EmailField = ({
  label,
  placeholder,
  required = false,
  backgroundColor = "bg-admin-page",
  inputRef,
  onChange,
  value,
}: EmailFieldProps) => {
  const [email, setEmail] = useState(value);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
    setEmail(e.target.value);
  }

  function hasError() {
    return email === "";
  }

  return (
    <div
      className={`${styles["text-container"]} w-72 sm:w-80 flex flex-col mx-auto`}
    >
      <label htmlFor="" className={`${hasError() ? "text-red-500" : ""}`}>
        {label} <span>{required ? "*" : ""}</span>
      </label>
      <input
        className={`${backgroundColor} border border-solid ${
          hasError() ? "border-red-400" : "border-gray-400"
        }`}
        type="email"
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onChange={handleChange}
      />
      <p className="mt-2 text-red-500">{`${
        hasError() ? "Email can't be empty" : ""
      }`}</p>
    </div>
  );
};

export default EmailField;
