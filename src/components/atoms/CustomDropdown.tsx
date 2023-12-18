import { Select } from "@chakra-ui/react";
import { memo } from "react";

//型定義
interface DropdownProps {
  name?: string;
  placeholder: string; //ユーザーガイダンス
  value: string; //ドロップダウンで現在選択されている値
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ドロップダウンの値が変更された時のイベントハンドラ
  options: Array<{ value: string; label: string }>; // ドロップダウンの選択肢
}

//Main
const CustomDropdown: React.FC<DropdownProps> = ({
  name,
  placeholder,
  value,
  onChange,
  options,
}) => {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
export default memo(CustomDropdown);
