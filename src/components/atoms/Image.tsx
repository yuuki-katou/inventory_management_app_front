import React, { memo } from "react";

interface ImageProps {
  src: string; // 画像のURL
  alt: string; // 画像が表示されない場合に表示されるテキスト
  width?: number; // 画像の幅
  height?: number; // 画像の高さ
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default memo(Image);
