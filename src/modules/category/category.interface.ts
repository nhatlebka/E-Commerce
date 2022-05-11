export interface ICategoryRes {
  _id?: string;
  name: string;
  banner: string[];
  description: string;
  position: number;
  states: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryQuery {
  name?: string;
  position?: number;
  states?: boolean;
}

export interface ICategoryDetail {
  _id: string;
  name: string;
  banner: string[];
  description: string;
  position: number;
  states: boolean;
  products: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreateUpdate {
  name: string;
  banner: string[];
  description: string;
  position: number;
  states: boolean;
}
