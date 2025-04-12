"use client";

import React from 'react';
import { FaFilter } from 'react-icons/fa';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  priceRange: {
    min: number;
    max: number;
  };
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
}) => {
  const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2000', min: 1000, max: 2000 },
    { label: 'Over $2000', min: 2000, max: Infinity },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FaFilter className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedCategory === ''
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
              }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => onPriceRangeChange(range.min, range.max)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${priceRange.min === range.min && priceRange.max === range.max
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 