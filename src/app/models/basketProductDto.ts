export class BasketProductDto {
  id?: number;
  productId: number;
  quantity: number;
  name: string;
  author: string;
  description: string;
  price: number;
  producer: string;
  productType: string;
  stock: number;
  isActive: boolean;
  // imgSrc?: string;


  constructor(productId: number,
              quantity: number,
              name: string,
              author: string,
              description: string,
              price: number,
              producer: string,
              productType: string,
              stock: number,
              isActive: boolean
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.name = name;
    this.author = author;
    this.description = description;
    this.price = price;
    this.producer = producer;
    this.productType = productType;
    this.stock = stock;
    this.isActive = isActive;
  }
}
