export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  lastUpdate: string;
  imageUrl: string;
  store: string;
  region: string;
}

export interface PriceHistory {
  date: string;
  price: number;
}