import { loadProducts, selectProductId, createProduct, updateProduct, deleteProduct } from './products.action';
import { on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';
import { Product } from '../../models/Product';

export interface State extends EntityState<Product> {
  selectedProductId: number;
}
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false
});
export const initialState: State = adapter.getInitialState({
  selectedProductId: 0,
});
export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state, {products}) => adapter.setAll(products, state)),
  on(selectProductId, (state, {productId}) => ({...state, selectedProductId: productId})),
  on(createProduct, (state, {product}) => adapter.setOne(product, state)),
  on(updateProduct, (state, {product}) => adapter.upsertOne(product, state)),
  on(deleteProduct, (state, {productId}) => adapter.removeOne(productId, state))
  );

export function selectedProductId(product: Product) {
  return product.id;
}
