import { atom } from "recoil";

interface Category {
  categoryId: number;
  categoryName: string;
}

interface Brand {
  brandId: number;
  brandName: string;
}

interface Condition {
  conditionId: number;
  conditionName: string;
}

interface Store {
  storeId: number;
  storeName: string;
  location: string;
  telephoneNumber: string;
}

// Recoil atoms
export const categoriesState = atom<Category[]>({
  key: "categoriesState",
  default: [],
});

export const brandsState = atom<Brand[]>({
  key: "brandsState",
  default: [],
});

export const conditionsState = atom<Condition[]>({
  key: "conditionsState",
  default: [],
});

export const storesState = atom<Store[]>({
  key: "storesState",
  default: [],
});

// sortsStateは配列の型が不明なので、具体的な型が必要な場合はそれに合わせて定義する
export const sortsState = atom<string[]>({
  key: "sortsState",
  default: [],
});
