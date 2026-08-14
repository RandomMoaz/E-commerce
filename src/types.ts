export type Category = "Electronics" | "Fashion" | "Home" | "Beauty" | "Sports";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  /** Original price, used to show a discount when higher than `price`. */
  oldPrice?: number;
  category: Category;
  rating: number;
  reviews: number;
  /** Real product photo URL (falls back to the gradient art if it fails to load). */
  image: string;
  /** Accent gradient used to render the product artwork placeholder / fallback. */
  colors: [string, string];
  /** Short marketing blurb shown on the product detail page. */
  description: string;
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
