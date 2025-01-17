import React from "react";

interface ToTitleProps {
  text?: string | null;
}

const ToTitle: React.FC<ToTitleProps> = ({ text = "" }) => {
  if (!text) {
    return null;
  }

  const titleCaseText = text.replace(/\b\w/g, (char) => char.toUpperCase());
  return <span>{titleCaseText}</span>;
};

export default ToTitle;
