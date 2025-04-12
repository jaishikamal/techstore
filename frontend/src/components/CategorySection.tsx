"use client";

import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Smartphones',
    image: '/images/categories/smartphones.jpg',
    slug: 'smartphones',
  },
  {
    id: 2,
    name: 'Laptops',
    image: '/images/categories/laptops.jpg',
    slug: 'laptops',
  },
  {
    id: 3,
    name: 'Audio',
    image: '/images/categories/audio.jpg',
    slug: 'audio',
  },
  {
    id: 4,
    name: 'Wearables',
    image: '/images/categories/wearables.jpg',
    slug: 'wearables',
  },
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <PlaceholderImage
                  text={category.name}
                  fill
                  bgColor={`bg-blue-${(category.id % 5 + 1) * 100}`}
                  textColor="text-white"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 