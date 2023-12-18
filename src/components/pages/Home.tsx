import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../molecules/ProductCard";
import Sidebar from "../molecules/Sidebar";
import SearchBar from "../molecules/SearchBar";
import CustomDropdown from "../atoms/CustomDropdown";
import { sidebarData } from "../../data/sortData";
import axios from "axios";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = memo(() => {
  const [itemsPerPage, setItemsPerPage] = useState(20); //ページごとの商品数(初期値:20)
  const [currentPage, setCurrentPage] = useState(1); //現在のページ番号(初期値:1)
  const [sortOption, setSortOption] = useState(""); //並び替えオプション
  const [products, setProducts] = useState([]); //商品リスト
  const [searchParams, setSearchParams] = useState({}); //検索パラメータ
  const navigate = useNavigate();

  // 初回レンダリング時に商品を取得
  useEffect(() => {
    fetchProducts();
  }, []);
  const toast = useToast(); // トーストフックを使用

  const fetchProducts = async (params = {}) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/search",
        { params }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);

      // エラーがAxiosError型であるか確認
      if (axios.isAxiosError(error)) {
        // HTTPステータスコードが404の場合、トースト通知を表示
        if (error.response?.status === 404) {
          toast({
            title: "商品が見つかりません。",
            description:
              "指定された検索条件に一致する商品は見つかりませんでした。",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  // キーワード検索を行う関数
  const handleSearch = (keyword: string) => {
    // 検索パラメータを更新する
    setSearchParams({ keyword });
    // 更新された検索パラメータで商品を取得する
    fetchProducts({ keyword });
  };

  // 詳細検索を行う関数
  const handleDetailedSearch = (newSearchParams: Record<string, string>) => {
    // //fetchProductsを呼び出し、newSearchParamsに該当する商品情報を取得する
    setSearchParams(newSearchParams);
    fetchProducts(newSearchParams);
  };

  // 並び替えオプションが変更された際の処理
  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    const updatedParams = { ...searchParams, sortOrder: newSortOption };
    // 検索パラメータを更新する
    setSearchParams(updatedParams);
    // 更新されたパラメータで商品を取得する
    fetchProducts(updatedParams);
  };

  //全体のページ数を算出　Math.ceilは切り上げ
  const totalPages = Math.ceil(products.length / itemsPerPage);

  //表示アイテムの算出　例）2ページ目は21 ~39番目の商品を表示する.
  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNewProduct = () => {
    navigate("/products/create");
  };
  return (
    <HomeContainer>
      <MainContainer>
        <Sidebar onDetailedSearch={handleDetailedSearch} />
        <ContentContainer>
          <Flex justifyContent={"flex-end"} marginTop={4}>
            <Button onClick={handleCreateNewProduct}>新規登録</Button>
          </Flex>
          <SearchBarContainer>
            <SearchBar onSearch={handleSearch} />
          </SearchBarContainer>
          <SortAndFilterContainer>
            <DisplayLabel>表示件数</DisplayLabel>
            <ButtonContainer>
              <PageSizeButton onClick={() => setItemsPerPage(20)}>
                20
              </PageSizeButton>
              <PageSizeButton onClick={() => setItemsPerPage(50)}>
                50
              </PageSizeButton>
              <PageSizeButton onClick={() => setItemsPerPage(100)}>
                100
              </PageSizeButton>
            </ButtonContainer>
            <DropdownContainer>
              <CustomDropdown
                placeholder="並べ替え"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                options={sidebarData.sorts.map((sort) => ({
                  value: sort,
                  label: sort,
                }))}
              />
            </DropdownContainer>
          </SortAndFilterContainer>
          <PaginationContainer>
            {/*「前へ」ボタン onClick=currentPageを -1 
            disabled :1ページ目にいる場合にこのボタンを無効化（クリックできなくする）する為の条件*/}
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              前へ
            </PaginationButton>

            {/*ページ数を表示　
            totalPagesに基づいて配列を用意*/}
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationButton key={i} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PaginationButton>
            ))}

            {/*「次へ」ボタン onClick=currentPageを +1 
            disabled :最終ページ目にいる場合にこのボタンを無効化（クリックできなくする）する為の条件*/}
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              次へ
            </PaginationButton>
          </PaginationContainer>
          <ProductListContainer>
            {currentItems.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </ProductListContainer>
          <PaginationContainer>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              前へ
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationButton key={i} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PaginationButton>
            ))}
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              次へ
            </PaginationButton>
          </PaginationContainer>
        </ContentContainer>
      </MainContainer>
    </HomeContainer>
  );
});

export default Home;

//スタイル設定
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px; // 余白を設定
`;

const SearchBarContainer = styled.div`
  display: column;
  justify-content: flex-end;
  padding: 20px 0;
`;
const DisplayLabel = styled.span`
  margin-right: 10px;
  white-space: nowrap;
`;
const MainContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 0px;
  width: 100%;
`;

const SortAndFilterContainer = styled.div`
  display: flex;
  justify-content: flex-end; // コンテナ内の要素を右端に寄せる
  align-items: center;
  gap: 20px; // 要素間の間隔を設定
  width: 100%; // 親コンテナの全幅を取る
`;

const DropdownContainer = styled.div`
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PageSizeButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
`;
