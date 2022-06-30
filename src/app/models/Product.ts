import { User } from "./user";

export class Product {
  id?: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  createdOn: Date;
  createdByUserId: number;
  createdByUser?: User;
}
