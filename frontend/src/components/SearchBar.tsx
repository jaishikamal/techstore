"use client";

import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import { products } from '@/data/products';
import ProductList from './ProductList';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 text-center mb-6">
        {filteredProducts.length} products found
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search to find what you're looking for.</p>
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default SearchBar; 