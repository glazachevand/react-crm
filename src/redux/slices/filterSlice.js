import { createSlice } from '@reduxjs/toolkit';

const getFiltersFromLS = () => {
  let product = 'all';
  let status = 'all';

  if (localStorage.getItem('product')) {
    product = localStorage.getItem('product');
  } else {
    localStorage.setItem('product', product);
  }

  if (localStorage.getItem('status')) {
    status = localStorage.getItem('status');
  } else {
    localStorage.setItem('status', status);
  }

  return { product, status };
};

const { product, status } = getFiltersFromLS();

const initialState = {
  product,
  status,
  itemsFilter: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterProduct(state, action) {
      state.product = action.payload;
    },
    changeFilterStatus(state, action) {
      state.status = action.payload;
    },
    filterRequests(state, action) {
      let arrFilter = action.payload.items;

      if (action.payload.product !== 'all') {
        arrFilter = arrFilter.filter((item) => item.product === action.payload.product);
      }

      if (action.payload.status !== 'all') {
        arrFilter = arrFilter.filter((item) => item.status === action.payload.status);
      }

      state.itemsFilter = arrFilter.map((item) => {
        const productName = action.payload.products.find((elem) => elem.product === item.product);
        const statusName = action.payload.statuses.find((elem) => elem.status === item.status);
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          dateFormat: new Date(item.date).toLocaleDateString(),
          productName: productName ? productName.title : '',
          statusName: statusName ? statusName.title : '',
          statusClass: statusName ? statusName.class : '',
        };
      });
    },
  },
});

export const { changeFilterProduct, changeFilterStatus, filterRequests } = filterSlice.actions;

export default filterSlice.reducer;
