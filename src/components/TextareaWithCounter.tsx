// TextareaWithCounter.tsx (または .jsx)
import React from "react";
import { Textarea, Box, Text } from "@chakra-ui/react";

interface TextareaWithCounterProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
}

const TextareaWithCounter: React.FC<TextareaWithCounterProps> = ({
  name,
  value,
  onChange,
  rows,
}) => {
  const maxChars = 1000;

  return (
    <Box>
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder="ここにテキストを入力"
        maxLength={maxChars}
        rows={rows}
      />
      <Text fontSize="sm">残り文字数: {maxChars - value.length}</Text>
    </Box>
  );
};

export default TextareaWithCounter;
