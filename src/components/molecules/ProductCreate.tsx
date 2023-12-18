import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Product } from "../../interfaces/Product";
import CustomDropdown from "../atoms/CustomDropdown";
import CustomInput from "../atoms/CustomInput";
import { validateField } from "../../data/validation";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  brandsState,
  conditionsState,
  storesState,
} from "../../state/atoms";
import TextareaWithCounter from "../TextareaWithCounter";
import ImageCard from "./ImageCard";

//型定義
interface ProductCreateProps {
  setProduct: (product: Product) => void;
}

// Main
const ProductCreate: React.FC<ProductCreateProps> = ({ setProduct }) => {
  // 商品データのローカルステートを管理
  // 初期状態は空の商品データ
  const [localProduct, setLocalProduct] = useState<Product>({
    productId: 0,
    productName: "",
    modelNumber: "",
    brand: "",
    category: "",
    price: 0,
    stockQuantity: 0,
    condition: "",
    description: "",
    image: "",
    store: "",
    dateAdded: "",
    lastUpdated: "",
  });

  const [validationMessages, setValidationMessages] = useState({
    productName: "",
    modelNumber: "",
    price: "",
    stockQuantity: "",
    description: "",
  });

  // Recoilのatomからデータを取得
  const categories = useRecoilValue(categoriesState);
  const brands = useRecoilValue(brandsState);
  const conditions = useRecoilValue(conditionsState);
  const stores = useRecoilValue(storesState);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setLocalProduct({ ...localProduct, [name]: "" });
      return;
    }
    const message = validateField(name, value);
    console.log(name);
    console.log(value);

    // バリデーションメッセージの設定
    setValidationMessages({ ...validationMessages, [name]: message });

    // フィールドが有効な場合のみlocalProductを更新
    if (!message) {
      setLocalProduct({ ...localProduct, [name]: value });
    }
  };

  useEffect(() => {
    setProduct(localProduct);
  }, [localProduct, setProduct]);

  const setImage = (image: string) => {
    setLocalProduct({ ...localProduct, image: image });
  };

  //フォームのレンダリング
  return (
    <EditContainer>
      <Row>
        {/* カテゴリのドロップダウン */}
        <Column>
          <Label>カテゴリ</Label>
          <CustomDropdown
            name="category"
            placeholder="カテゴリを選択"
            value={localProduct.category}
            onChange={handleInputChange}
            options={categories.map((category) => ({
              value: category.categoryName, // または必要に応じて適切なプロパティ
              label: category.categoryName,
            }))}
          />
        </Column>
        <Column>
          {/* ブランドのドロップダウン */}
          <Label>ブランド</Label>
          <CustomDropdown
            name="brand"
            placeholder="ブランドを選択"
            value={localProduct.brand}
            onChange={handleInputChange}
            options={brands.map((brand) => ({
              value: brand.brandName,
              label: brand.brandName,
            }))}
          />
        </Column>
      </Row>
      <Row>
        {/* 商品名の入力フィールド */}
        <Column>
          <Label>商品名</Label>
          <CustomInput
            type="text"
            name="productName"
            value={localProduct.productName}
            onChange={handleInputChange}
            placeholder="商品名を入力"
          />
          {validationMessages.productName && (
            <ErrorMessage>{validationMessages.productName}</ErrorMessage>
          )}
        </Column>

        {/* 型番の入力フィールド */}
        <Column>
          <Label>型番</Label>
          <CustomInput
            type="text"
            name="modelNumber"
            value={localProduct.modelNumber}
            onChange={handleInputChange}
            placeholder="型番を入力"
          />
          {validationMessages.modelNumber && (
            <ErrorMessage>{validationMessages.modelNumber}</ErrorMessage>
          )}
        </Column>
      </Row>

      <Row>
        {/* 販売価格の入力フィールド */}
        <Column>
          <Label>販売価格（税抜き）</Label>
          <CustomInput
            type="number"
            name="price"
            value={localProduct.price.toString()}
            onChange={handleInputChange}
            placeholder="販売価格を入力"
          />
          {validationMessages.price && (
            <ErrorMessage>{validationMessages.price}</ErrorMessage>
          )}
        </Column>
        {/* 在庫数の入力フィールド */}
        <Column>
          <Label>在庫数</Label>
          <CustomInput
            type="number"
            name="stockQuantity"
            value={localProduct.stockQuantity.toString()}
            onChange={handleInputChange}
            placeholder="在庫数を入力"
          />
          {validationMessages.stockQuantity && (
            <ErrorMessage>{validationMessages.stockQuantity}</ErrorMessage>
          )}
        </Column>
      </Row>
      <Row>
        {/* 取り扱い店舗のドロップダウン */}
        <Column>
          <Label>取り扱い店舗</Label>
          <CustomDropdown
            name="store"
            placeholder="取り扱い店舗を選択"
            value={localProduct.store}
            onChange={handleInputChange}
            options={stores.map((store) => ({
              value: store.storeName,
              label: store.storeName,
            }))}
          />
        </Column>
        {/* 商品の状態のドロップダウン */}
        <Column>
          <Label>商品の状態</Label>
          <CustomDropdown
            name="condition"
            placeholder="商品の状態を選択"
            value={localProduct.condition}
            onChange={handleInputChange}
            options={conditions.map((condition) => ({
              value: condition.conditionName,
              label: condition.conditionName,
            }))}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <ImageCard setProduct={setImage} productImage={localProduct.image} />
        </Column>
      </Row>
      <Row>
        <Column>
          {/* 商品の状態のドロップダウン */}
          <Label>商品説明</Label>
          <TextareaWithCounter
            name="description"
            value={localProduct.description}
            onChange={handleInputChange}
            rows={20} // 例えば、行数を5に設定
          />
        </Column>
      </Row>
    </EditContainer>
  );
};

export default memo(ProductCreate);

// Styled components
const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 80%;
  margin: auto;
`;

const Label = styled.label`
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;
