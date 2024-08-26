import React from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  Icon: React.ReactNode;
  className?: string;
  action: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, className, action }) => {
  return (
    <button
      className={twMerge(
        `w-7 h-7 flex justify-center items-center rounded-full shadow-2xl bg-blue-500`,
        className
      )}
      onClick={action}
    >
      {Icon}
    </button>
  );
};

export default IconButton;
