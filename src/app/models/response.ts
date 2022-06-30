import { Product } from "./Product";

export class ResponseData {
  requestType: number;
  message: string;
  entityId: number;
  userData: any;
  productData: Product;
  isValid: boolean;
}

export enum RequestType {
  POST,
  PUT,
  DELETE
}
