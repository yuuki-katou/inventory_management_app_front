import React from "react";
import styled from "styled-components";
import { memo } from "react";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo>在庫管理アプリ</Logo>
    </StyledHeader>
  );
};
export default memo(Header);

// ヘッダー全体のスタイル定義
const StyledHeader = styled.header`
  background-color: gray;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// ロゴまたはサイト名のスタイル定義
const Logo = styled.h1`
  margin: 0;
`;
