'use client';
import React from 'react';
import ProductPage from "./product-page";

const Page = ({params}) => {
  const {productId} = params;

  return (
    <ProductPage productId={productId} />
  );
}

export default Page;
