import { createSlice } from '@reduxjs/toolkit';
import { getRequestById, putRequest, deleteRequest } from '../asyncActions';
import { StatusLoading } from '../../types';

const initialState = {
  requestEdit: [],
  getStatusLoading: StatusLoading.LOADING,
  putStatusLoading: StatusLoading.SUCCESS,
  deleteStatusLoading: StatusLoading.SUCCESS,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    getRequestForEdit(state, action) {
      const dateNew = new Date(action.payload.date);
      state.requestEdit = {
        ...action.payload,
        dateEdit: `${dateNew.toLocaleDateString('ru-RU')} ${dateNew.toLocaleTimeString('ru-RU')}`,
      };
    },
    changeRequestField(state, action) {
      state.requestEdit[action.payload.field] = action.payload.value;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getRequestById.pending, (state) => {
      state.getStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(getRequestById.fulfilled, (state) => {
      state.getStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(getRequestById.rejected, (state) => {
      state.getStatusLoading = StatusLoading.ERROR;
    });
    builder.addCase(putRequest.pending, (state) => {
      state.putStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(putRequest.fulfilled, (state) => {
      state.putStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(putRequest.rejected, (state) => {
      state.putStatusLoading = StatusLoading.ERROR;
    });
    builder.addCase(deleteRequest.pending, (state) => {
      state.deleteStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(deleteRequest.fulfilled, (state) => {
      state.deleteStatusLoading = StatusLoading.SUCCESS;
      state.requestEdit = [];
    });
    builder.addCase(deleteRequest.rejected, (state) => {
      state.deleteStatusLoading = StatusLoading.ERROR;
    });
  },
});

export const { getRequestForEdit, changeRequestField } = editSlice.actions;

export default editSlice.reducer;
