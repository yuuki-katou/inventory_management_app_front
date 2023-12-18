export interface Product {
  productId: number; //商品ID
  productName: string; //商品名
  modelNumber: string; //型番
  brand: string; // ブランド名
  category: string; // カテゴリ
  price: number; // 価格（BigDecimalはJavaScriptのnumberに相当）
  stockQuantity: number; // 在庫数量
  condition: string; // 状態
  description: string; // 説明
  image: string; // 画像（バイト配列ではなく、画像のURLやBase64エンコード文字列を想定）
  store: string; // 店舗名
  dateAdded: string; // 追加日
  lastUpdated: string; // 最終更新日
}
