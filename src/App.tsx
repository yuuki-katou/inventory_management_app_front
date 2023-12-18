import React, { memo } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/pages/ProductDetails";
import Header from "./components/molecules/Header";
import Edit from "./components/pages/Edit";
import Create from "./components/pages/Create";
import { RecoilRoot } from "recoil";
import DataFetcher from "./components/DataFetcher";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <DataFetcher />
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/create" element={<Create />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="products/:productId/edit" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
