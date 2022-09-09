import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchRequests,
  getRequestById,
  addRequest,
  putRequest,
  deleteRequest,
} from '../asyncActions';
import { RootState } from '../store';
import { StatusLoading, Request, Status } from '../../types';

interface RequestSliceState {
  items: Request[];
  requestsStatusLoading: StatusLoading;
  getStatusLoading: StatusLoading;
  addStatusLoading: StatusLoading;
  putStatusLoading: StatusLoading;
  deleteStatusLoading: StatusLoading;
  requestsErrorMessage: string;
  addErrorMessage: string;
  getErrorMessage: string;
  putErrorMessage: string;
  deleteErrorMessage: string;
  statusBadges: Status[];
  editId: string;
}

const initialState: RequestSliceState = {
  items: [],
  requestsStatusLoading: StatusLoading.LOADING,
  getStatusLoading: StatusLoading.LOADING,
  addStatusLoading: StatusLoading.BEGIN,
  putStatusLoading: StatusLoading.BEGIN,
  deleteStatusLoading: StatusLoading.BEGIN,
  requestsErrorMessage: '',
  addErrorMessage: '',
  getErrorMessage: '',
  putErrorMessage: '',
  deleteErrorMessage: '',
  statusBadges: [
    { status: 'all', badges: 0 },
    { status: 'new', badges: 0 },
    { status: 'inwork', badges: 0 },
    { status: 'complete', badges: 0 },
  ],
  editId: localStorage.getItem('editId') || '',
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    countBadges(state, action: PayloadAction<Status[]>) {
      state.statusBadges[0].badges = state.items.length;
      action.payload.forEach((elem) => {
        const index = state.statusBadges.findIndex((item) => item.status === elem.status);
        if (index > 0) {
          const itemsStatusFilter = state.items.filter((item) => item.status === elem.status);
          state.statusBadges[index].badges = itemsStatusFilter.length;
        }
      });
    },
    addStatusUpdate(state) {
      state.addStatusLoading = StatusLoading.BEGIN;
    },
    putStatusUpdate(state) {
      state.putStatusLoading = StatusLoading.BEGIN;
    },
    deleteStatusUpdate(state) {
      state.deleteStatusLoading = StatusLoading.BEGIN;
    },
    setEditId(state, action: PayloadAction<string>) {
      state.editId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRequests.pending, (state) => {
      state.requestsStatusLoading = StatusLoading.LOADING;
      state.items = [];
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.requestsStatusLoading = StatusLoading.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      state.requestsStatusLoading = StatusLoading.ERROR;
      state.requestsErrorMessage = action.payload as string;
      state.items = [];
    });
    builder.addCase(getRequestById.pending, (state) => {
      state.getStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(getRequestById.fulfilled, (state) => {
      state.getStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(getRequestById.rejected, (state, action) => {
      state.getStatusLoading = StatusLoading.ERROR;
      state.getErrorMessage = action.payload as string;
    });
    builder.addCase(addRequest.pending, (state) => {
      state.addStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(addRequest.fulfilled, (state) => {
      state.addStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(addRequest.rejected, (state, action) => {
      state.addStatusLoading = StatusLoading.ERROR;
      state.addErrorMessage = action.payload as string;
    });
    builder.addCase(putRequest.pending, (state) => {
      state.putStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(putRequest.fulfilled, (state) => {
      state.putStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(putRequest.rejected, (state, action) => {
      state.putStatusLoading = StatusLoading.ERROR;
      state.putErrorMessage = action.payload as string;
    });
    builder.addCase(deleteRequest.pending, (state) => {
      state.deleteStatusLoading = StatusLoading.LOADING;
    });
    builder.addCase(deleteRequest.fulfilled, (state) => {
      state.deleteStatusLoading = StatusLoading.SUCCESS;
    });
    builder.addCase(deleteRequest.rejected, (state, action) => {
      state.deleteStatusLoading = StatusLoading.ERROR;
      state.deleteErrorMessage = action.payload as string;
    });
  },
});

export const { countBadges, addStatusUpdate, putStatusUpdate, deleteStatusUpdate, setEditId } =
  requestsSlice.actions;

export const selectRequests = (state: RootState) => state.requests;
export const selectRequestsEditId = (state: RootState) => state.requests.editId;
export const selectRequestsBadges = (state: RootState) => state.requests.statusBadges;

export default requestsSlice.reducer;
