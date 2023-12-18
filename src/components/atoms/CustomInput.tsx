import React, { memo } from "react";
import { Input as ChakraInput, Textarea } from "@chakra-ui/react";

interface InputProps {
  as?: "input" | "textarea"; // 'input' または 'textarea' を設定可能に
  name: string;
  type?: string; // 入力タイプ
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  rows?: number;
}

const CustomInput: React.FC<InputProps> = ({
  as = "input",
  name,
  type,
  value,
  onChange,
  placeholder,
  rows,
}) => {
  if (as === "textarea") {
    return (
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    );
  }
  return (
    <ChakraInput
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default memo(CustomInput);
