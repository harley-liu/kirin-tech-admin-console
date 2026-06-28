export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category_id: string;
  in_stock: boolean;
  stock_quantity: number;
  featured: boolean;
  specs: Record<string, string>;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
