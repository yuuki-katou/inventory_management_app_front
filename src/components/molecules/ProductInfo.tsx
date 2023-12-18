import React from "react";
import styled from "styled-components";
import { Product } from "../../interfaces/Product";

const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  });
  return formatter.format(price);
};

// Main component
const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <InfoContainer>
      <ProductMeta>
        <ProductNumber>{`商品ID: ${product.productId}`}</ProductNumber>
        <RegistrationDate>{`登録日: ${product.dateAdded}`}</RegistrationDate>
        <UpdateDate>{`更新日: ${product.lastUpdated}`}</UpdateDate>
      </ProductMeta>
      <Title>{product.productName}</Title>
      <Price>{`販売価格: ${formatPrice(product.price)}`}</Price>
      <Stock>{`在庫状況: ${product.stockQuantity}`}</Stock>
      {/* Render other product details with the Details styled component */}
      <Details>{`取り扱い店舗: ${product.store}`}</Details>
      <Details>{`メーカー: ${product.brand}`}</Details>
      <Details>{`型番: ${product.modelNumber}`}</Details>
      <Details>{`商品状態: ${product.condition}`}</Details>
    </InfoContainer>
  );
};

export default ProductInfo;

// Styled components for better readability
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #fff;
`;

const Title = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-family: "Helvetica", sans-serif;
  font-size: 20px;
  color: #e44d26;
  margin-bottom: 8px;
`;

const Stock = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Details = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
`;
const ProductNumber = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
  margin-right: 16px;
`;

const RegistrationDate = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
  margin-right: 16px;
`;

const UpdateDate = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

const ProductMeta = styled.div`
  display: flex;
`;
