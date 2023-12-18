import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import ProductCreate from "../molecules/ProductCreate";

const Create: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // 商品データのステート管理
  const [productData, setProductData] = useState<Product | null>(null);

  // アラートダイアログの表示状態管理
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  // アラートダイアログを閉じる関数
  const onClose = () => setIsAlertOpen(false);

  // 商品データの更新を受け取る関数
  const updateProductData = (newData: Product) => {
    setProductData(newData);
  };

  // 商品をサーバーに登録する非同期関数
  const createProduct = async () => {
    if (!productData) return;

    try {
      await axios.post("http://localhost:8080/products", productData);
      toast({
        title: "商品が正常に登録されました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "商品の登録に失敗しました。",
        description: "エラーが発生しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box p={5}>
        <Flex justifyContent="flex-end">
          <Button onClick={() => navigate("/")} mr={2}>
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={() => setIsAlertOpen(true)}>
            登録
          </Button>
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
                商品情報の登録
              </AlertDialogHeader>
              <AlertDialogBody>商品を登録してよろしいですか？</AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onClose}>いいえ</Button>
                <Button colorScheme="blue" onClick={createProduct} ml={3}>
                  はい
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <ProductCreate setProduct={updateProductData} />
    </>
  );
};
export default Create;

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
