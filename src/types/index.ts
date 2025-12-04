export interface Product {
  id: string;
  name: string;
  variety: string;
  sugarBrix: number;
  acidity?: number;
  aromaNotes?: string;
  origin: string;
  harvestDate?: string;
  size: string;
  unitPrice: number;
  stock: number;
  images: string[];
  tags: string[];
  description?: string;
}

export interface ProductSet {
  id: string;
  name: string;
  description: string;
  items: { productId: string; quantity: number }[];
  price: number;
  images: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  period: { start: string; end: string };
  discountRule?: string;
  banner: string;
}

export interface CmsPost {
  id: string;
  title: string;
  body: string;
  images: string[];
  category: string;
  author: string;
  publishedAt: string;
}
