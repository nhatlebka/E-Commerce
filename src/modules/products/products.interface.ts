export interface IProductRes {
  _id?: string;
  name: string;
  barcode: string;
  avatar: string;
  image: string[];
  price: number;
  buyPrice: number;
  weight: number;
  quantity: number;
  description?: string;
  category: string;
  deleteAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductQuery {
  name?: string;
  quantity?: number;
  category: string;
  limit?: number;
  page?: number;
  sort?: string;
  sortBy?: string;
}

export interface ICountRes {
  count: number;
}

export interface IProductUpdate {
  name: string;

  avatar: string;
  image: string[];
  buyPrice: number;
  price: number;
  weight: number;
  quantity: number;
  category: string;
  description?: string;
}

export interface IProductCreate extends IProductUpdate {
  barcode: string;
}

export interface IProductCount {
  name?: string;
  quantity?: number;
  category: string;
}
