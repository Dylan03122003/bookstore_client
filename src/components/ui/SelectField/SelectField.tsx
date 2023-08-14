import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { TbSelector } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import styles from "./SelectField.module.css";

type SelectFieldProps = {
  label: string;
  isRequired: boolean;
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
};

const SelectField = ({
  label,
  isRequired = false,
  onChange,
  defaultValue = [],
}: SelectFieldProps) => {
  const [choices, setChoices] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [selectedChoices, setSelectedChoices] =
    useState<string[]>(defaultValue);
  const [open, setOpen] = useState<boolean>(false);
  const [touchChoice, setTouchChoice] = useState(false);

  function hasError() {
    return selectedChoices.length === 0 && touchChoice;
  }

  useEffect(() => {
    const categoriesJSON = localStorage.getItem("categories");
    setChoices(categoriesJSON ? JSON.parse(categoriesJSON) : []);
  }, []);

  function handleSelect(choice: string) {
    const isChoiceAlreadySelected: boolean = selectedChoices.some(
      (selectedChoice) => selectedChoice === choice
    );
    if (isChoiceAlreadySelected) return handleDeleteChoice(choice);
    setSelectedChoices([choice, ...selectedChoices]);
    onChange && onChange([choice, ...selectedChoices]);
    setTouchChoice(true);
  }

  function handleDeleteChoice(choice: string) {
    const filteredChoices = selectedChoices.filter(
      (selectedChoice) => selectedChoice !== choice
    );
    setSelectedChoices(filteredChoices);
    onChange && onChange(filteredChoices);
  }

  function handleAddTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isChoiceAlreadySelected: boolean = choices.some(
      (choice) => choice === tag
    );

    if (!isChoiceAlreadySelected) {
      setChoices((prevChoices) => [tag, ...prevChoices]);
      handleSelect(tag);
      localStorage.setItem("categories", JSON.stringify([tag, ...choices]));
    }
    setTag("");
  }

  return (
    <div
      className={`${styles["select-container"]} flex flex-col w-72 sm:w-80 mx-auto`}
    >
      <label className={`mb-2 ${hasError() ? "text-red-500" : "text-wording"}`}>
        {label} <span style={{ color: "red" }}>{isRequired ? "*" : ""}</span>
      </label>
      <div
        className={`${styles["select-field"]} border border-solid ${
          selectedChoices.length > 0 ? styles["has-selected-item"] : ""
        } ${hasError() ? "border-red-500" : "border-gray-400"}`}
      >
        <div className={styles["selected-item-container"]}>
          {selectedChoices.map((choice) => {
            return (
              <div key={choice} className={styles["selected-item"]}>
                <span>{choice}</span>
                <button
                  onClick={() => handleDeleteChoice(choice)}
                  type="button"
                >
                  <MdClear />
                </button>
              </div>
            );
          })}
          <form className="ml-2" onSubmit={handleAddTag}>
            <input
              type="text"
              className="bg-admin-page outline-none"
              placeholder="add more category"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
          </form>
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

export default SelectField;
