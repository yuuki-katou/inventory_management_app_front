import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "../molecules/ProductInfo";
import { Product } from "../../interfaces/Product";
import Image from "../atoms/Image";
import {
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button as ChakraButton,
  Flex,
} from "@chakra-ui/react";

const ProductDetails: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef = useRef(null);
  const [product, setProduct] = useState<Product | undefined>();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("商品情報の取得に失敗しました。", error);
      }
    };

    if (productId) {
      fetchProducts();
    }
  }, [productId]);

  const editProduct = () => {
    navigate(`/products/${productId}/edit`, { state: { product } });
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      toast({
        title: "商品が削除されました。",
        description: "商品は正常に削除されました。",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "エラーが発生しました。",
        description: "商品を削除できませんでした。",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-start" m={2}>
        <Flex justifyContent="flex-start">
          <ChakraButton onClick={() => navigate("/")}>戻る</ChakraButton>
        </Flex>
        <Flex>
          <ChakraButton
            colorScheme="green"
            onClick={editProduct}
            marginRight={2}
          >
            編集
          </ChakraButton>
          <ChakraButton colorScheme="red" onClick={() => setIsAlertOpen(true)}>
            削除
          </ChakraButton>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              商品の削除
            </AlertDialogHeader>

            <AlertDialogBody>
              本当によろしいですか？この操作は元に戻すことができません。
            </AlertDialogBody>

            <AlertDialogFooter>
              <ChakraButton ref={cancelRef} onClick={onClose}>
                キャンセル
              </ChakraButton>
              <ChakraButton colorScheme="red" onClick={deleteProduct} ml={3}>
                削除
              </ChakraButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <DetailsContainer>
        <ImageAndInfoContainer>
          <ImageContainer>
            <Image
              src={product?.image || "https://placehold.jp/200x300.png"}
              alt="商品画像"
              width={200}
              height={300}
            />
          </ImageContainer>
          <ProductInfoContainer>
            {product && <ProductInfo product={product} />}
          </ProductInfoContainer>
        </ImageAndInfoContainer>
        <DescriptionBanner>商品説明</DescriptionBanner>
        <DescriptionContainer>{product?.description}</DescriptionContainer>
      </DetailsContainer>
    </>
  );
};

export default ProductDetails;

const DetailsContainer = styled.div`
  display: column;
  padding: 0 20px;
`;

const ImageAndInfoContainer = styled.div`
  display: flex;
  flex-direction: row; // 子要素を横並びにする
  align-items: flex-start; // 子要素を上端に揃える
  justify-content: center; // 子要素を水平方向の中心に配置
  margin: 20px auto; // 上下のマージンを20px、左右のマージンを自動にして中央寄せ
  gap: 20px; // 子要素の間にスペースを追加
`;

const ImageContainer = styled.div`
  max-width: 600px; // 画像の最大幅を設定
  margin: auto; // 上下のマージンを20px、左右のマージンを自動にして中央寄せ
`;

const ProductInfoContainer = styled.div`
  flex: 1; // 商品情報が残りのスペースを埋めるように設定
  max-width: 600px; // 商品情報の最大幅を設定
  // 必要に応じてパディングやその他のスタイリングをここに追加
`;

const DescriptionBanner = styled.div`
  background: #f5f5f5;
  padding: 16px;
  margin: 24px 0;
  font-size: 18px;
  color: #333;
  // バナーのための追加スタイリング
`;

const DescriptionContainer = styled.div`
  white-space: pre-wrap; // 改行と空白を保持
  // その他の必要なスタイリングをここに追加
`;
