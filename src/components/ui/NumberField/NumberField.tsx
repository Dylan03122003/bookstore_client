import React, { ChangeEvent, useState } from "react";
import { uppercaseFirstCharacter } from "../../../utils/stringStuff";
import styles from "./NumberField.module.css";

type NumberFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  name?: string;
  forPhoneNumber?: boolean;
  value?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const NumberField = ({
  label,
  placeholder,
  required = false,
  inputRef,
  forPhoneNumber = false,
  value,
  onChange,
  name,
}: NumberFieldProps) => {
  const [number, setNumber] = useState(value);

  function hasError() {
    if (forPhoneNumber) {
      return number !== undefined && number < 0;
    }

    return number !== undefined && number <= 0;
  }

  console.log(number);

  function getErrorMessage() {
    if (forPhoneNumber) {
      return "Not a valid phone number";
    }

    return `${uppercaseFirstCharacter(name || "")} must be greater than zero!`;
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
    setNumber(+e.target.value);
  }

  return (
    <div
      className={`${styles["number-container"]} flex flex-col w-72 sm:w-80 mx-auto`}
    >
      <label
        htmlFor=""
        className={`mb-2 ${hasError() ? "text-red-500" : "text-wording"}`}
      >
        {label} <span>{required ? "*" : ""}</span>
      </label>
      <input
        type="number"
        placeholder={placeholder}
        required
        value={value}
        name={name}
        ref={inputRef}
        min={1}
        className={`bg-admin-page border border-solid  ${
          hasError() ? "border-red-500" : "border-gray-400"
        }`}
        onChange={handleNumberChange}
      />

      <p className={`mt-2 text-red-500 ${hasError() ? "block" : "hidden"}`}>
        {getErrorMessage()}
      </p>
    </div>
  );
};

export default NumberField;
