import React, { useState } from "react";
import Button from "../atoms/Button";
import styled from "styled-components";
import CustomInput from "../atoms/CustomInput";

// スタイルされたコンテナの定義
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// onSearch 関数の型定義
interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

// SearchBar コンポーネントの定義
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchBarContainer>
      <CustomInput
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="キーワードを入力"
      />
      <Button label="検索" onClick={handleSearchClick} />
    </SearchBarContainer>
  );
};

export default SearchBar;
