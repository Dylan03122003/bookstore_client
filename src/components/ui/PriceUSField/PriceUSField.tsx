import React, { ChangeEvent, useState } from "react";

import styles from "./PriceUSField.module.css";

type PriceUSFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  name?: string;
  value?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PriceUSField = ({
  label,
  placeholder,
  required,
  inputRef,
  value,
  onChange,
  name,
}: PriceUSFieldProps) => {
  const [price, setPrice] = useState(value);

  function hasError() {
    return price !== undefined && price <= 0;
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
    setPrice(+e.target.value);
  }

  return (
    <div
      className={`${styles["price-us-container"]} flex flex-col w-72 sm:w-80 mx-auto`}
    >
      <label
        htmlFor="price"
        className={`mb-2 ${hasError() ? "text-red-500" : "text-wording"}`}
      >
        {label} <span>{required ? "*" : ""}</span>
      </label>
      <div
        className={`${styles["input-container"]} border border-solid  ${
          hasError() ? "border-red-500" : "border-gray-400"
        }`}
      >
        <span>$</span>
        <input
          id="price"
          type="number"
          placeholder={placeholder}
          ref={inputRef}
          min={1}
          name={name}
          value={value}
          className={`bg-admin-page `}
          onChange={handlePriceChange}
        />
        <span>USD</span>
      </div>

      <p className={`mt-2 text-red-500 ${hasError() ? "block" : "hidden"}`}>
        Price must be greater than zero!
      </p>
    </div>
  );
};

export default PriceUSField;
