import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-56 relative">
         {product.isBestSeller && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10 uppercase tracking-wide">
              Best Seller
            </span>
         )}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-lg font-medium text-gray-900">
          <a href={product.affiliateLink}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </a>
        </h3>
        <div className="flex items-center">
           {[...Array(5)].map((_, i) => (
             <Star
               key={i}
               className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
             />
           ))}
           <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex-1 flex flex-col justify-end">
           <div className="flex items-baseline mt-4">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
           </div>
           <button className="mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             <ShoppingCart className="h-4 w-4 mr-2" />
             View Deal
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
