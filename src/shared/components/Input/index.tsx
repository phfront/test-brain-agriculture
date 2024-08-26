/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  value: string | number;
  setValue: (value: any) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  type,
  placeholder,
  label,
  className,
}) => {
  const handleValue = (_value: string) => {
    setValue(_value);
  };

  return (
    <div className={twMerge("w-full", className)}>
      {label ? <span className="text-sm ml-2">{label}</span> : <></>}
      <div className="bg-[#222222] px-2 py-1 shadow-xl rounded">
        <input
          className="bg-transparent w-full outline-none"
          type={type ? type : "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
