"use client";

import React from 'react';
import Link from 'next/link';
import { FaLaptop, FaMobileAlt } from 'react-icons/fa';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
        <div className="relative bg-white p-2.5 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaLaptop className="text-blue-600 text-2xl animate-pulse" />
            <FaMobileAlt className="text-blue-600 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
          Kamal Tech Store
        </span>
        <span className="text-sm text-gray-500">Your One-Stop Tech Shop</span>
      </div>
    </Link>
  );
};

export default Logo; 