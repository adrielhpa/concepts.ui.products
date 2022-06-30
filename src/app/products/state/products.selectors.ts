import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, State } from "./products.reducer";

const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

export const getSelectedProductId = (state: State) => state.selectedProductId;
export const selectProductState =  createFeatureSelector<State>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  selectAll
);
export const selectProductIds = createSelector(
  selectProductState,
  selectIds
);
export const selectProductEntities = createSelector(
  selectProductState,
  selectEntities
);
export const selectCurrentProductId = createSelector(
  selectProductState,
  (state) => state.selectedProductId
);
export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectCurrentProductId,
  (entities, productId) => entities[productId]
);
