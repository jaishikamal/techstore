"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ArrowLeftIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import PlaceholderImage from '@/components/PlaceholderImage';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md inline-flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
            </div>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <PlaceholderImage
                      text={item.name}
                      fill
                      bgColor={`bg-blue-${(item.id % 5 + 1) * 100}`}
                      textColor="text-white"
                    />
                  </div>

                  <div className="flex-grow">
                    <Link href={`/products/${item.id}`} className="font-semibold hover:text-blue-600 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border rounded-l-md hover:bg-gray-100"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <div className="px-3 py-1 border-t border-b">{item.quantity}</div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border rounded-r-md hover:bg-gray-100"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Link href="/products" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-6 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 