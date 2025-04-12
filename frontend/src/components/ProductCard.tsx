"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  description,
}) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCart({ id, name, price, image, quantity: 1 });

    // Reset the adding state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <Link href={`/products/${id}`} className="block">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 group overflow-hidden">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => setImgSrc('/placeholder.png')}
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-4 right-4 bg-blue-600 text-white p-2.5 rounded-full transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } hover:bg-blue-700 hover:scale-110 shadow-lg flex items-center justify-center ${isAddingToCart ? 'bg-green-500 scale-110' : ''
              }`}
          >
            {isAddingToCart ? (
              <span className="text-white text-sm">Added!</span>
            ) : (
              <FaShoppingCart className="text-lg" />
            )}
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">{category}</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 