"use client";

import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Ultimate Electronics Destination
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Discover the latest tech gadgets and electronics. From smartphones to laptops,
            we've got everything you need to stay connected in today's digital world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-md inline-block text-center transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="#trending"
              className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold px-6 py-3 rounded-md inline-block text-center transition-colors"
            >
              View Trending
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 