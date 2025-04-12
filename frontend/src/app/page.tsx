"use client";

import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ProductList from '@/components/ProductList';
import { featuredProducts, trendingProducts, products } from '@/data/products';
import Link from 'next/link';
import BackgroundImage from '@/components/BackgroundImage';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <BackgroundImage />

      {/* Hero Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&auto=format&fit=crop&q=60")',
            opacity: 0.9
          }}
        />
        <div className="relative bg-gradient-to-b from-black/50 to-transparent">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Welcome to Kamal Tech Store
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-slide-up">
                Your One-Stop Shop for Premium Electronics and Tech Accessories
              </p>
              <div className="flex justify-center gap-4 animate-fade-in">
                <Link
                  href="/products"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center group"
                >
                  Shop Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#trending"
                  className="bg-white/10 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-colors"
                >
                  View Trending
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Search Products</h2>
          <SearchBar />
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>
        <ProductList products={featuredProducts} />
      </section>

      {/* Trending Products */}
      <section id="trending" className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          <ProductList products={trendingProducts} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest products and exclusive offers. Join our mailing list today!
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-r-md hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
