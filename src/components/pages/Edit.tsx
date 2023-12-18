import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Product } from "../../interfaces/Product";
import ProductEdit from "../molecules/ProductEdit";

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const toast = useToast();
  const [productData, setProductData] = useState<Product | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (location.state && "product" in location.state) {
      setProductData((location.state as { product: Product }).product);
    } else {
      toast({
        title: "Error",
        description: "No product data provided.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigate("/products");
    }
  }, [location, navigate, toast]);

  const updateProduct = async () => {
    if (!productId || !productData) return;

    try {
      await axios.patch(
        `http://localhost:8080/products/${productId}`,
        productData
      );
      toast({
        title: "正常に更新されました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/products/${productId}`);
    } catch (error) {
      toast({
        title: "更新に失敗しました。",
        description: "エラーが発生しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  // 製品データの更新を受け取る関数
  const handleProductUpdate = (updatedProduct: Product) => {
    setProductData(updatedProduct);
  };

  return (
    <>
      <Box p={5}>
        <Flex justifyContent="flex-end">
          <Button onClick={() => navigate("/")} mr={2}>
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={() => setIsAlertOpen(true)}>
            更新
          </Button>
        </Flex>
        <form onSubmit={handleSubmit}>
          {/* ここにフォームフィールド */}
          {productData && (
            <ProductEdit
              product={productData}
              setProduct={handleProductUpdate}
            />
          )}
        </form>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                商品情報を更新
              </AlertDialogHeader>
              <AlertDialogBody>更新してよろしいですか？</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  いいえ
                </Button>
                <Button colorScheme="blue" onClick={updateProduct} ml={3}>
                  はい
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};

export default Edit;

// const DetailsContainer = styled.div`
//   display: column;
//   padding: 0 20px;
// `;

// const ImageAndInfoContainer = styled.div`
//   display: flex;
//   flex-direction: row; // 子要素を横並びにする
//   align-items: flex-start; // 子要素を上端に揃える
//   justify-content: center; // 子要素を水平方向の中心に配置
//   margin: 20px auto; // 上下のマージンを20px、左右のマージンを自動にして中央寄せ
//   gap: 20px; // 子要素の間にスペースを追加
// `;

// const ImageContainer = styled.div`
//   max-width: 600px; // 画像の最大幅を設定
//   margin: auto; // 上下のマージンを20px、左右のマージンを自動にして中央寄せ
// `;

// const ProductInfoContainer = styled.div`
//   flex: 1; // 商品情報が残りのスペースを埋めるように設定
//   max-width: 600px; // 商品情報の最大幅を設定
//   // 必要に応じてパディングやその他のスタイリングをここに追加
// `;

// const DescriptionBanner = styled.div`
//   background: #f5f5f5;
//   padding: 16px;
//   margin: 24px 0;
//   font-size: 18px;
//   color: #333;
//   // バナーのための追加スタイリング
// `;

// const RemoveImageButton = styled.button`
//   position: absolute; // ボタンを絶対位置に配置
//   top: 0;
//   right: 0;
//   background: #fff;
//   border: none;
//   cursor: pointer;
//   // 必要に応じてスタイリングを調整
// `;

// const Label = styled.label`
//   margin-top: 10px;
// `;

// const StyledTextArea = styled.textarea`
//   padding: 8px;
//   margin: 5px 0;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;
