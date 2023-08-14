import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TbSelector } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import styles from "./../ui/SelectField/SelectField.module.css";

type SingleSelectProps = {
  label: string;
  defaultChoices: string[];
  width?: string;
  marginB?: string;
  rounded?: string;
  onChange?: (tag: string) => void;
  defaultSelected: string;
  marginX?: string;
};

const SingleSelect = ({
  label,
  defaultChoices,
  width = "w-72 sm:w-80",
  marginX = "mx-auto",
  marginB,
  rounded,
  defaultSelected,
  onChange,
}: SingleSelectProps) => {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([
    `${defaultSelected}`,
  ]);
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [choices] = useState<string[]>(defaultChoices);

  function hasError() {
    return false;
  }

  function handleSelect(choice: string) {
    setSelectedChoices([choice]);
    onChange && onChange(choice);
  }

  return (
    <div
      className={`${styles["select-container"]}  flex flex-col ${width} ${marginB} ${marginX}`}
    >
      <label className={`mb-2 ${hasError() ? "text-red-500" : "text-wording"}`}>
        {label}
      </label>
      <div
        className={`${styles["select-field"]} ${rounded} border border-solid ${
          selectedChoices.length > 0 ? styles["has-selected-item"] : ""
        } ${hasError() ? "border-red-500" : "border-gray-400"}`}
      >
        <div className={styles["selected-item-container"]}>
          {selectedChoices.map((choice) => {
            return (
              <div key={choice} className={styles["selected-item"]}>
                <span>{choice}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          className={styles["toggle-btn"]}
          type="button"
        >
          <TbSelector />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={styles["choice-container"]}
          >
            {choices.map((choice) => {
              return (
                <button
                  onClick={() => handleSelect(choice)}
                  type="button"
                  className="flex items-center"
                  key={choice}
                >
                  <div
                    className={
                      selectedChoices.includes(choice) ? styles["selected"] : ""
                    }
                  >
                    <TiTick />
                  </div>
                  <p>{choice}</p>
                </button>
              );
            })}

            {choices.length === 0 && (
              <p className="text-sm text-gray-500">
                There is no category. Please add new one!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <p className={`mt-2 text-red-500 ${hasError() ? "block" : "hidden"}`}>
        Must choose at lease one tag!
      </p>
    </div>
  );
};

export default SingleSelect;
