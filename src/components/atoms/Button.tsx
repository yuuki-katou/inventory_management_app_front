import React, { memo } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

//引数の型定義
interface ButtonProps {
  label: string; //ボタンに表示する文字
  onClick?: () => void; //クリックに実行される関数
}

//Main
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <ChakraButton
      onClick={onClick}
      _hover={{ bg: "#f0f0f0" }}
      _active={{ bg: "#e0e0e0", transform: "scale(0.98)" }}
    >
      {label}
    </ChakraButton>
  );
};
export default memo(Button);
