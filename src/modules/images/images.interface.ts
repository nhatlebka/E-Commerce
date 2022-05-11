export interface IImage {
  name: string;
  type: string;
}

export interface IQueryImage {
  name: string;
  type: string;
  limit?: number;
  page?: number;
  sort?: string;
  sortBy?: string;
}

export interface IImageRes {
  name: string;
  public_id: string;
  url: string;
  type: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
