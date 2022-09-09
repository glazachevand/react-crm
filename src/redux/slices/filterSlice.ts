import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RequestTable, Request, Status, Product } from '../../types';

const getFiltersFromLS = (): { product: string; status: string } => {
  const product = localStorage.getItem('product') || 'all';
  const status = localStorage.getItem('status') || 'all';

  if (!localStorage.getItem('product')) {
    localStorage.setItem('product', product);
  }

  if (!localStorage.getItem('status')) {
    localStorage.setItem('status', status);
  }

  return { product, status };
};

const { product, status } = getFiltersFromLS();

interface FilterSliceState {
  product: string;
  status: string;
  itemsFilter: RequestTable[];
}

const initialState: FilterSliceState = {
  product,
  status,
  itemsFilter: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterProduct(state, action: PayloadAction<string>) {
      state.product = action.payload;
    },
    changeFilterStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    filterRequests(
      state,
      action: PayloadAction<{
        product: string;
        status: string;
        statuses: Status[];
        products: Product[];
        items: Request[];
      }>,
    ) {
      let arrFilter = action.payload.items;

      if (action.payload.product !== 'all') {
        arrFilter = arrFilter.filter((item) => item.product === action.payload.product);
      }

      if (action.payload.status !== 'all') {
        arrFilter = arrFilter.filter((item) => item.status === action.payload.status);
      }

      state.itemsFilter = arrFilter.map((item) => {
        const productFind = action.payload.products.find((elem) => elem.product === item.product);
        const statusFind = action.payload.statuses.find((elem) => elem.status === item.status);
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          dateFormat: new Date(item.date).toLocaleDateString(),
          productName: productFind?.title || '',
          statusName: statusFind?.title || '',
          statusClass: statusFind?.class || '',
        };
      });
    },
  },
});

export const { changeFilterProduct, changeFilterStatus, filterRequests } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterProduct = (state: RootState) => state.filter.product;
export const selectFilterStatus = (state: RootState) => state.filter.status;

export default filterSlice.reducer;
