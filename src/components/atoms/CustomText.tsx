import React, { ReactNode, memo } from "react";
import { Text as ChakuraText } from "@chakra-ui/react";

interface TextProps {
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return (
    // Chakra UIのTextコンポーネントを使用し、スタイルプロパティを直接適用
    <ChakuraText fontSize="xs" color="#333" my="0.5em">
      {children}
    </ChakuraText>
  );
};

export default memo(Text);
