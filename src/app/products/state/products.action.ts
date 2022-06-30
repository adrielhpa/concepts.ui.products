import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { Product } from '../../models/Product';


export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ products: Product[] }>()
);
export const selectProductId = createAction(
  '[Products] Select Product Id',
  props<{ productId: number }>()
);
export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: Product }>()
);
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ product: Product }>()
);
export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ productId: number }>()
);
