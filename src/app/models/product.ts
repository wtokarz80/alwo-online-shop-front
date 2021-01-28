export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  imgSrc?: string;
}
