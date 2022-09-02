import { createSlice } from '@reduxjs/toolkit';
import { StatusLoading } from '../../types';
import { fetchRequests, addRequest } from '../asyncActions';

const initialState = {
  items: [],
  statusLoading: StatusLoading.LOADING,
  addStatusLoading: StatusLoading.SUCCESS,
  badges: {
    all: 0,
  },
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    countBadges(state, action) {
      state.badges['all'] = state.items.length;
      action.payload.forEach((elem) => {
        const badgeItem = state.items.filter((item) => item.status === elem.status);
        state.badges[elem.status] = badgeItem.length;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRequests.pending, (state) => {
      state.statusLoading = StatusLoading.LOADING;
      state.items = [];
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.statusLoading = StatusLoading.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchRequests.rejected, (state) => {
      state.statusLoading = StatusLoading.ERROR;
      state.items = [];
    });
    builder.addCase(addRequest.pending, (state) => {
      state.addStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(addRequest.fulfilled, (state) => {
      state.addStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(addRequest.rejected, (state) => {
      state.addStatusLoading = StatusLoading.ERROR;
    });
  },
});

export const { countBadges } = requestsSlice.actions;

export default requestsSlice.reducer;
