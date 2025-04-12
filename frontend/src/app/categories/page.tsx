"use client";

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductList from '@/components/ProductList';
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTabletAlt, FaDesktop, FaSearch } from 'react-icons/fa';

const categories = [
  { id: 'laptops', name: 'Laptops', icon: FaLaptop },
  { id: 'smartphones', name: 'Smartphones', icon: FaMobileAlt },
  { id: 'accessories', name: 'Accessories', icon: FaHeadphones },
  { id: 'tablets', name: 'Tablets', icon: FaTabletAlt },
  { id: 'desktops', name: 'Desktops', icon: FaDesktop },
];

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped = categories.reduce((acc, category) => {
      acc[category.id] = products.filter(
        (product) => product.category.toLowerCase() === category.id.toLowerCase()
      );
      return acc;
    }, {} as Record<string, typeof products>);

    // Filter products based on search query
    if (searchQuery) {
      Object.keys(grouped).forEach((category) => {
        grouped[category] = grouped[category].filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    return grouped;
  }, [products, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Shop by Category</h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Category Sections */}
      <div className="space-y-16">
        {categories.map((category) => {
          const Icon = category.icon;
          const categoryProducts = productsByCategory[category.id];

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} className="scroll-mt-16" id={category.id}>
              <div className="flex items-center space-x-3 mb-6">
                <Icon className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-semibold">{category.name}</h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ProductList products={categoryProducts} />
              </div>
            </section>
          );
        })}
      </div>

      {/* No Results Message */}
      {Object.values(productsByCategory).every((products) => products.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
} 