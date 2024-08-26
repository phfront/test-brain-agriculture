import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  action: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  className,
  action,
  disabled,
}) => {
  return (
    <button
      onClick={() => {
        if (!disabled) {
          action();
        }
      }}
      className={twMerge(
        `h-8 flex justify-center items-center rounded-lg px-3 shadow-2xl bg-blue-500 text-white ${
          disabled ? "opacity-30 cursor-default" : ""
        }`,
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
