import React, { memo } from "react";
import styled from "styled-components";
import Image from "../atoms/Image";
import { Product } from "../../interfaces/Product";
import { useNavigate } from "react-router-dom";

// 価格をフォーマットする関数（日本円形式）
const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  });
  return formatter.format(price);
};

// 商品カードコンポーネント
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  // カードクリック時の処理（商品詳細ページへの遷移)
  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };
  return (
    <Card onClick={handleCardClick}>
      <ImageWrapper>
        <Image
          src={product.image}
          alt={product.productName}
          width={100}
        ></Image>
      </ImageWrapper>
      <ContentWrapper>
        <ProductMeta>
          {/* 商品ID、登録日、更新日 */}
          <span>商品ID：{product.productId}</span>
          <span>登録日：{product.dateAdded}</span>
          <span>更新日：{product.lastUpdated}</span>
        </ProductMeta>
        {/* ブランド */}
        <BrandName>{product.brand}</BrandName>
        {/* 商品名 */}
        <ProductName>{product.productName}</ProductName>
        {/* 在庫 */}
        <ProductMeta>在庫数：{product.stockQuantity}個</ProductMeta>
        {/* 型番 */}
        <ProductMeta>型番：{product.modelNumber}</ProductMeta>
        {/* 取り扱い店舗 */}
        <ProductMeta>取扱店舗：{product.store}</ProductMeta>
      </ContentWrapper>
      <PriceWrapper>
        {/* 価格（税込） */}
        <ProductPrice>{formatPrice(product.price)}</ProductPrice>
        <Tax>(税込)</Tax>
      </PriceWrapper>
    </Card>
  );
};
export default memo(ProductCard);

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
    border-color: #ccc;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 0.5rem;
`;

const ContentWrapper = styled.div`
  flex: 2;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceWrapper = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: start;
`;

const BrandName = styled.p`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.9rem;
  color: #555;
  & > span + span {
    margin-left: 2rem;
  }
  white-space: nowrap;
`;

const ProductName = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-weight: bold;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.9rem;
  color: #555;
  & > span + span {
    margin-left: 1rem;
  }
  white-space: nowrap;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #e53e3e;
  font-weight: bold;
  margin: 0;
`;
const Tax = styled.p`
  font-size: 0.9rem;
`;
