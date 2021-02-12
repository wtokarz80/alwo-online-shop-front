import {Category} from './category';

export interface Product {
  id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  producer: string;
  productType: string;
  stock: number;
  isActive: boolean;
  url: string;
  categories: Category[];
}
