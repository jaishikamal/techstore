"use client";

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          rating={product.rating}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductList; 