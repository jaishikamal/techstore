import { FaStar, FaShoppingCart } from "react-icons/fa";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
    category: "Laptops",
    rating: 4.8,
    description: "Latest MacBook Pro with M2 chip, 16-inch display, and up to 22 hours of battery life."
  },
  {
    id: 2,
    name: "AirPods Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format&fit=crop&q=60",
    category: "Audio",
    rating: 4.7,
    description: "Wireless earbuds with active noise cancellation and spatial audio."
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60",
    category: "Smartphones",
    rating: 4.9,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system."
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60",
    category: "Wearables",
    rating: 4.6,
    description: "Smartwatch with advanced health features and always-on display."
  },
  {
    id: 5,
    name: "Dell XPS 15",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60",
    category: "Laptops",
    rating: 4.5,
    description: "Premium Windows laptop with 15.6-inch 4K display and powerful performance."
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    category: "Audio",
    rating: 4.8,
    description: "Wireless noise-canceling headphones with exceptional sound quality."
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=60",
    category: "Smartphones",
    rating: 4.7,
    description: "Flagship Android smartphone with advanced AI features and S Pen."
  },
  {
    id: 8,
    name: "Fitbit Sense 2",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
    category: "Wearables",
    rating: 4.4,
    description: "Advanced health smartwatch with ECG and stress management features."
  },
  {
    id: 9,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60",
    category: "Laptops",
    rating: 4.6,
    description: "Business laptop with premium build quality and long battery life."
  },
  {
    id: 10,
    name: "Bose QuietComfort Ultra",
    price: 429.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    category: "Audio",
    rating: 4.7,
    description: "Premium wireless headphones with immersive audio and noise cancellation."
  },
  {
    id: 11,
    name: "Google Pixel 8 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=60",
    category: "Smartphones",
    rating: 4.5,
    description: "Google's flagship smartphone with advanced AI features and camera system."
  }
];

export const featuredProducts = products.slice(0, 4);
export const trendingProducts = [products[0], products[2], products[4], products[6]]; 