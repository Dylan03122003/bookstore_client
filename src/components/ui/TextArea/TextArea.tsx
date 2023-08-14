import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
  backgroundColor?: string;
  marginX?: string;
  width?: string;
  refresh?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
  label,
  placeholder,
  required = false,
  onChange,
  className,
  backgroundColor = "bg-admin-page",
  value,
  width = "w-72 sm:w-80",
  name,
  marginX = "mx-auto",
}: TextAreaProps) => {
  const [text, setText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleAutoResize(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = `70px`;
    const scHeight = event.target.scrollHeight;
    event.target.style.height = `${scHeight}px`;
    setText(event.target.value);
    onChange(event);
  }

  function hasError() {
    return text?.trim() === "";
  }

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, []);

  return (
    <div
      className={`${styles["textarea-container"]} ${className} ${width} flex flex-col ${marginX}`}
    >
      <label
        htmlFor="textarea"
        className={`${hasError() ? "text-red-500" : "text-wording"} mb-2`}
      >
        {label} <span>{required ? "*" : ""}</span>
      </label>
      <textarea
        ref={textareaRef}
        value={text}
        name={name}
        id="textarea"
        onChange={(e) => handleAutoResize(e)}
        placeholder={placeholder}
        className={`${backgroundColor} border border-solid ${
          hasError() ? "border-red-500" : "border-gray-400"
        }`}
      ></textarea>

      <p
        className={`mt-2 text-red-500 ${
          text?.trim() === "" ? "block" : "hidden"
        }`}
      >
        Must have some text!
      </p>
    </div>
  );
};

export default TextArea;
