import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  CloseButton,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

interface ImageData {
  src: string;
  alt: string;
}
interface ImageCardProps {
  setProduct: (image: string) => void;
  productImage: string; // 親コンポーネントから受け取る画像URLのプロパティ
}

const ImageCard: React.FC<ImageCardProps> = ({ setProduct, productImage }) => {
  // 初期状態として親コンポーネントから受け取った画像URLを使用
  const [image, setImage] = useState<ImageData | null>(
    productImage ? { src: productImage, alt: "Product Image" } : null
  );
  const { onOpen } = useDisclosure();

  // 画像が親コンポーネントから更新された場合に対応
  useEffect(() => {
    if (productImage) {
      setImage({ src: productImage, alt: "Product Image" });
    }
  }, [productImage]);

  const handleDelete = () => {
    setImage(null);
    setProduct("");
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage({
        src: imageUrl,
        alt: file.name,
      });
      setProduct(imageUrl);
    }
  };

  return (
    <Box>
      {image && (
        <Box position="relative" width="100px" height="100px">
          <Image
            src={image.src}
            alt={image.alt}
            boxSize="100px"
            objectFit="cover"
          />
          <IconButton
            aria-label="Delete image"
            icon={<CloseButton />}
            size="sm"
            position="absolute"
            top={0}
            right={0}
            onClick={handleDelete}
          />
        </Box>
      )}
      <Button mt={4} onClick={onOpen} as="label">
        画像を追加
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Button>
    </Box>
  );
};

export default React.memo(ImageCard);
