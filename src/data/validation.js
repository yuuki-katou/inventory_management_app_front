export const validateField = (name, value) => {
  let message = "";
  switch (name) {
    case "productName":
      if (!value) message = "商品名は必須項目です。";
      else if (value.toString().length > 50)
        message = "商品名は50文字以内で入力してください。";
      break;
    case "modelNumber":
      if (!value) message = "型番は必須項目です。";
      else if (value.toString().length > 10)
        message = "型番は10文字以内で入力してください。";
      break;
    case "price":
      if (value === null || value === 0)
        message = "価格は0以上で入力してください。";
      else if (value > 1000000)
        message = "価格は1,000,000以下で入力してください。";
      break;
    case "stockQuantity":
      if (value === null) message = "在庫数は必須項目です。";
      else if (value < 0) message = "在庫数は0以上で入力してください。";
      else if (value > 10000)
        message = "在庫数は10,000以下で入力してください。";
      break;
    case "description":
      if (value.toString().length > 1000)
        message = "説明文は1000文字以内で入力してください。";
      break;

    default:
      break;
  }
  return message;
};
