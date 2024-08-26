/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SelectOption } from "../../types/select.type";
import { FaChevronCircleDown } from "react-icons/fa";
import { createPortal } from "react-dom";

interface SelectProps {
  value: unknown;
  setValue: (value: unknown) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  setValue,
  options,
  placeholder,
  label,
  className,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOption = (option: SelectOption) => {
    setValue(option.value);
    setIsOpen(false);
  };

  const boxBounds = useMemo(() => {
    if (selectRef.current) {
      const bounds = selectRef.current.getBoundingClientRect();
      return {
        left: bounds.left,
        top: bounds.top + bounds.height,
        width: `${bounds.width}px`,
      } as CSSProperties;
    }

    return {
      left: 10,
      top: 10,
    };
  }, [selectRef.current, isOpen]);

  const text = useMemo(() => {
    const op = options.find((o) => o.value === value);
    return op ? op.label : "";
  }, [options, value]);

  return (
    <div className={twMerge("w-full", className)}>
      {label ? <span className="text-sm ml-2">{label}</span> : <></>}
      <div
        ref={selectRef}
        className="flex items-center justify-between bg-[#222222] px-2 py-1 shadow-xl rounded cursor-pointer gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {text ? (
          <span className="text-[15px] select-none grow truncate">{text}</span>
        ) : (
          <span className="text-[#9ca3af] text-[15px] select-none grow truncate">
            {placeholder ? placeholder : "Selecione"}
          </span>
        )}
        <FaChevronCircleDown
          className={`fill-white transition-all duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen ? (
        createPortal(
          <div
            className="top-0 left-0 w-screen h-screen z-50 fixed bg-[#0000007c]"
            onClick={(e) => {
              if (
                document.elementsFromPoint &&
                document
                  .elementsFromPoint(e.clientX, e.clientY)
                  .every(
                    (el) => !el.classList.contains("select-option-container")
                  )
              ) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className="bg-[#3a3a3a] absolute rounded-lg select-option-container p-2 max-h-[40vh] overflow-auto"
              style={{ ...boxBounds }}
            >
              {options.map((op, i) => (
                <div
                  key={i}
                  onClick={() => handleOption(op)}
                  className={`flex items-center gap-2 h-8 cursor-pointer px-2 hover:bg-neutral-800 ${
                    op.value === value ? "bg-neutral-800" : ""
                  }`}
                >
                  <span className="select-none">{op.label}</span>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
