import React, { memo } from "react";
import Button from "../atoms/Button";
import CustomDropdown from "../atoms/CustomDropdown";
import styled from "styled-components";
import CustomInput from "../atoms/CustomInput";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  brandsState,
  conditionsState,
  storesState,
} from "../../state/atoms";
import useResettableState from "../../hooks/useResettableState";

interface SidebarProps {
  onDetailedSearch: (searchParams: Record<string, string>) => void;
}

const Sidebar: React.FC<SidebarProps> = memo(({ onDetailedSearch }) => {
  const [selectedCategory, setSelectedCategory, resetCategory] =
    useResettableState("");
  const [selectedBrand, setSelectedBrand, resetBrand] = useResettableState("");
  const [selectedCondition, setSelectedCondition, resetCondition] =
    useResettableState("");
  const [minPrice, setMinPrice, resetMinPrice] = useResettableState("");
  const [maxPrice, setMaxPrice, resetMaxPrice] = useResettableState("");
  const [selectedStore, setSelectedStore, resetStore] = useResettableState("");
  const [keyword, setKeyword, resetKeyword] = useResettableState("");

  const resetAll = () => {
    resetCategory();
    resetBrand();
    resetCondition();
    resetMaxPrice();
    resetMinPrice();
    resetStore();
    resetKeyword();
  };

  // Recoilのatomからデータを取得
  const categories = useRecoilValue(categoriesState);
  const brands = useRecoilValue(brandsState);
  const conditions = useRecoilValue(conditionsState);
  const stores = useRecoilValue(storesState);

  const handleSearch = () => {
    const searchParams = {
      ...(selectedCategory && { categoryName: selectedCategory }),
      ...(selectedBrand && { brandName: selectedBrand }),
      ...(selectedCondition && { conditionName: selectedCondition }),
      ...(minPrice && { priceLower: minPrice }),
      ...(maxPrice && { priceUpper: maxPrice }),
      ...(selectedStore && { storeName: selectedStore }),
      ...(keyword && { keyword }),
    };
    onDetailedSearch(searchParams);
  };

  return (
    <SidebarContainer>
      <SectionTitle>詳細検索</SectionTitle>
      <Section>
        <SectionTitle>カテゴリ</SectionTitle>
        <CustomDropdown
          placeholder="カテゴリを選択"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories.map((category) => ({
            value: category.categoryName,
            label: category.categoryName,
          }))}
        />
      </Section>
      <Section>
        <SectionTitle>ブランド</SectionTitle>
        <CustomDropdown
          placeholder="ブランドを選択"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          options={brands.map((brand) => ({
            value: brand.brandName,
            label: brand.brandName,
          }))}
        />
      </Section>
      <Section>
        <SectionTitle>状態</SectionTitle>
        <CustomDropdown
          placeholder="状態を選択"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          options={conditions.map((condition) => ({
            value: condition.conditionName,
            label: condition.conditionName,
          }))}
        />
      </Section>
      <Section>
        <SectionTitle>価格</SectionTitle>
        <CustomInput
          type="number"
          name="minprice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="価格下限"
        />
        <CustomInput
          type="number"
          name="maxprice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="価格上限"
        />
      </Section>

      <Section>
        <SectionTitle>取扱い店舗</SectionTitle>
        <CustomDropdown
          placeholder="店舗を選択"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          options={stores.map((store) => ({
            value: store.storeName,
            label: store.storeName,
          }))}
        />
      </Section>
      <Section>
        <SectionTitle>キーワード</SectionTitle>
        <CustomInput
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワード"
        />
      </Section>
      <SectionWithReset>
        <StyledButton label="詳細検索" onClick={handleSearch} />
        <ResetButton onClick={resetAll}>検索条件をリセットする</ResetButton>
      </SectionWithReset>
    </SidebarContainer>
  );
});
export default Sidebar;

const SidebarContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
`;

const Section = styled.div`
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

const SectionWithReset = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
`;

const ResetButton = styled.span`
  cursor: pointer;
  font-weight: bold;
  margin-left: 30px;
  font-size: 0.8rem;
  color: #888;
  transition: color 0.3s ease;
  align-self: center; // ボタンのテキストを中央揃えにする

  &:hover {
    color: red;
  }
`;
