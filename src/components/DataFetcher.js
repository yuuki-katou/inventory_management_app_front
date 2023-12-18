import React, { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {
  categoriesState,
  brandsState,
  conditionsState,
  storesState,
} from "../state/atoms";

const DataFetcher = () => {
  const setCategories = useSetRecoilState(categoriesState);
  const setBrands = useSetRecoilState(brandsState);
  const setConditions = useSetRecoilState(conditionsState);
  const setStores = useSetRecoilState(storesState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, conditionsRes, storesRes, sortsRes] =
          await Promise.all([
            axios.get("http://localhost:8080/categories"),
            axios.get("http://localhost:8080/brands"),
            axios.get("http://localhost:8080/conditions"),
            axios.get("http://localhost:8080/stores"),
          ]);

        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
        setConditions(conditionsRes.data);
        setStores(storesRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [setCategories, setBrands, setConditions, setStores]);

  return null; // このコンポーネントはUIを持たない
};

export default DataFetcher;
