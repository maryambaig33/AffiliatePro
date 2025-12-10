export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  imageUrl: string;
  affiliateLink: string;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
