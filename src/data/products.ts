import type { Category, Product } from "../types";

export interface CategoryEntry {
  name: Category;
  blurb: string;
  colors: [string, string];
  image: string;
}


const catImg = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

export const categories: CategoryEntry[] = [
  {
    name: "Electronics",
    blurb: "Gadgets & audio",
    colors: ["#DB4444", "#ff6b6b"],
    image: catImg("photo-1498049794561-7780e7231661"),
  },
  {
    name: "Fashion",
    blurb: "Wear the season",
    colors: ["#1f2937", "#4b5563"],
    image: catImg("photo-1445205170230-053b83016050"),
  },
  {
    name: "Home",
    blurb: "Comfort & decor",
    colors: ["#0ea5a0", "#4fe0c9"],
    image: catImg("photo-1616486338812-3dadae4b4ace"),
  },
  {
    name: "Beauty",
    blurb: "Glow essentials",
    colors: ["#db2777", "#f472b6"],
    image: catImg("photo-1596462502278-27bfdc403348"),
  },
  {
    name: "Sports",
    blurb: "Move more",
    colors: ["#2563eb", "#60a5fa"],
    image: catImg("photo-1517836357463-d25dfeac3438"),
  },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export const products: Product[] = [
  {
    id: "aurora-headphones",
    name: "Aurora Wireless Headphones",
    brand: "Sonik",
    price: 129.0,
    oldPrice: 179.0,
    category: "Electronics",
    rating: 4.8,
    reviews: 1243,
    image: img("photo-1505740420928-5e560c06d30e"),
    colors: ["#DB4444", "#ff7a7a"],
    description:
      "Immersive active-noise-cancelling over-ear headphones with 40-hour battery life, plush memory-foam earcups, and studio-grade drivers tuned for deep bass and crisp highs.",
    tags: ["ANC", "40h battery", "Bluetooth 5.3"],
    inStock: true,
    isNew: true,
  },
  {
    id: "pulse-smartwatch",
    name: "Pulse Smartwatch Series 6",
    brand: "Sonik",
    price: 199.0,
    oldPrice: 249.0,
    category: "Electronics",
    rating: 4.7,
    reviews: 872,
    image: img("photo-1523275335684-37898b6baf30"),
    colors: ["#1f2937", "#4b5563"],
    description:
      "Track workouts, sleep, and heart rate on a vivid always-on AMOLED display. Water resistant to 50m with a 7-day battery and 120+ sport modes.",
    tags: ["AMOLED", "GPS", "7-day battery"],
    inStock: true,
  },
  {
    id: "nimbus-sneakers",
    name: "Nimbus Running Sneakers",
    brand: "Strive",
    price: 89.0,
    category: "Sports",
    rating: 4.6,
    reviews: 540,
    image: img("photo-1542291026-7eec264c27ff"),
    colors: ["#2563eb", "#60a5fa"],
    description:
      "Feather-light performance runners with responsive foam midsoles and a breathable knit upper that keeps you cool mile after mile.",
    tags: ["Lightweight", "Breathable", "Cushioned"],
    inStock: true,
  },
  {
    id: "linen-overshirt",
    name: "Coastal Linen Overshirt",
    brand: "Marée",
    price: 64.0,
    oldPrice: 79.0,
    category: "Fashion",
    rating: 4.5,
    reviews: 318,
    image: img("photo-1596755094514-f87e34085b2c"),
    colors: ["#1f2937", "#6b7280"],
    description:
      "A relaxed-fit overshirt cut from breathable European linen. Layer it open or button it up — effortless from the beach to the city.",
    tags: ["100% linen", "Relaxed fit"],
    inStock: true,
    isNew: true,
  },
  {
    id: "terra-mug-set",
    name: "Terra Stoneware Mug Set",
    brand: "Casa",
    price: 34.0,
    category: "Home",
    rating: 4.9,
    reviews: 205,
    image: img("photo-1514228742587-6b1558fcca3d"),
    colors: ["#0ea5a0", "#4fe0c9"],
    description:
      "A set of four hand-glazed stoneware mugs. Each piece is subtly unique, microwave and dishwasher safe, and built for slow mornings.",
    tags: ["Set of 4", "Handmade", "Dishwasher safe"],
    inStock: true,
  },
  {
    id: "lumen-serum",
    name: "Lumen Vitamin-C Serum",
    brand: "Glowe",
    price: 28.0,
    oldPrice: 38.0,
    category: "Beauty",
    rating: 4.7,
    reviews: 1580,
    image: img("photo-1620916566398-39f1143ab7be"),
    colors: ["#db2777", "#f472b6"],
    description:
      "A brightening 15% vitamin-C serum with hyaluronic acid that evens tone, softens fine lines, and leaves skin dewy — never sticky.",
    tags: ["15% Vit-C", "Hyaluronic", "Vegan"],
    inStock: true,
  },
  {
    id: "orbit-speaker",
    name: "Orbit Portable Speaker",
    brand: "Sonik",
    price: 59.0,
    category: "Electronics",
    rating: 4.4,
    reviews: 402,
    image: img("photo-1608043152269-423dbba4e7e1"),
    colors: ["#DB4444", "#ff7a7a"],
    description:
      "Room-filling 360° sound in a pocket-sized, IP67 waterproof body. 20 hours of playtime and a strap that clips anywhere your day goes.",
    tags: ["360° sound", "Waterproof", "20h"],
    inStock: true,
  },
  {
    id: "cloud-throw",
    name: "Cloud Chunky Knit Throw",
    brand: "Casa",
    price: 72.0,
    oldPrice: 95.0,
    category: "Home",
    rating: 4.8,
    reviews: 289,
    image: img("photo-1584100936595-c0654b55a2e6"),
    colors: ["#0ea5a0", "#8b9dc3"],
    description:
      "An oversized chunky-knit throw in buttery-soft chenille that drapes beautifully over any sofa or bed. Warmth you can sink into.",
    tags: ["Chenille", "Oversized"],
    inStock: false,
  },
  {
    id: "trail-backpack",
    name: "Trail 24L Daypack",
    brand: "Strive",
    price: 78.0,
    category: "Sports",
    rating: 4.6,
    reviews: 611,
    image: img("photo-1553062407-98eeb64c6a62"),
    colors: ["#2563eb", "#60a5fa"],
    description:
      "A 24-litre weather-ready daypack with a padded laptop sleeve, hydration port, and ventilated back panel for city commutes and weekend trails alike.",
    tags: ["24L", "Water-resistant", "Laptop sleeve"],
    inStock: true,
  },
  {
    id: "solene-sunglasses",
    name: "Solène Polarized Sunglasses",
    brand: "Marée",
    price: 45.0,
    oldPrice: 60.0,
    category: "Fashion",
    rating: 4.5,
    reviews: 224,
    image: img("photo-1511499767150-a48a237f0083"),
    colors: ["#1f2937", "#6b7280"],
    description:
      "Timeless acetate frames with polarized UV400 lenses that cut glare and sharpen color. Comes with a hard case and cleaning cloth.",
    tags: ["Polarized", "UV400"],
    inStock: true,
    isNew: true,
  },
  {
    id: "velvet-lip",
    name: "Velvet Matte Lip Trio",
    brand: "Glowe",
    price: 22.0,
    category: "Beauty",
    rating: 4.6,
    reviews: 733,
    image: img("photo-1586495777744-4413f21062fa"),
    colors: ["#db2777", "#f472b6"],
    description:
      "Three long-wear matte lip shades enriched with shea butter for a soft, weightless finish that lasts through the day.",
    tags: ["Set of 3", "Long-wear"],
    inStock: true,
  },
  {
    id: "focus-lamp",
    name: "Focus LED Desk Lamp",
    brand: "Casa",
    price: 49.0,
    oldPrice: 65.0,
    category: "Home",
    rating: 4.7,
    reviews: 356,
    image: img("photo-1507473885765-e6ed057f782c"),
    colors: ["#0ea5a0", "#2563eb"],
    description:
      "A minimalist aluminium desk lamp with stepless dimming, three color temperatures, and a built-in USB-C charging port for tidy desks.",
    tags: ["Dimmable", "USB-C", "3 tones"],
    inStock: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
