"use client";

import { products } from '@/data/products';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div>
          <span className="text-blue-600 font-medium">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({product.rating.toFixed(1)})</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>

          {/* Description */}
          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 