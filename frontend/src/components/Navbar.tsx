"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/deals" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaSearch className="text-xl" />
            </button>
            <Link 
              href="/cart" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link 
              href="/account" 
              className="text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaUser className="text-xl" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Deals
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                About
              </Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors">
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 