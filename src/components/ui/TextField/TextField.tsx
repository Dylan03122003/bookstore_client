import React, { ChangeEvent, useState } from "react";
import styles from "./TextField.module.css";

type TextFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  backgroundColor?: string;
  name?: string;
  forPhone?: boolean;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({
  label,
  placeholder,
  required = false,
  backgroundColor = "bg-admin-page",
  inputRef,
  onChange,
  name,

  forPhone = false,
  value,
}: TextFieldProps) => {
  const [text, setText] = useState(value);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
    setText(e.target.value);
  }

  function getErrorMessage() {
    if (forPhone) {
      return "Not a valid phone number";
    }

    return "Must have some text!";
  }

  function hasError() {
    if (forPhone) {
      return text?.trim() === "" || /[a-zA-Z]/.test(text || "");
    }

    return text?.trim() === "";
  }

  return (
    <div
      className={`${styles["text-container"]} w-72 sm:w-80 flex flex-col mx-auto`}
    >
      <label
        htmlFor=""
        className={`${hasError() ? "text-red-500" : "text-wording"} mb-2`}
      >
        {label} <span>{required ? "*" : ""}</span>
      </label>
      <input
        className={`${backgroundColor} border border-solid ${
          hasError() ? "border-red-500" : "border-gray-400"
        }`}
        type="text"
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onChange={handleTextChange}
      />
      <p className={`mt-2 text-red-500 ${hasError() ? "block" : "hidden"}`}>
        {getErrorMessage()}
      </p>
    </div>
  );
};

export default TextField;
