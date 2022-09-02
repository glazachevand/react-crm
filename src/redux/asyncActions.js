import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusLoading } from '../types';
import { serverPath } from '../utils/variables';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequestsStatus',
  async (params, thunkAPI) => {
    const res = await fetch(serverPath + 'requests' + params);
    if (!res.ok) {
      return thunkAPI.rejectWithValue(StatusLoading.ERROR);
    } else {
      return await res.json();
    }
  },
);

export const getRequestById = createAsyncThunk(
  'requests/getRequestsStatus',
  async (id, thunkAPI) => {
    const res = await fetch(serverPath + 'requests/' + id);
    if (!res.ok) {
      return thunkAPI.rejectWithValue(StatusLoading.ERROR);
    } else {
      return await res.json();
    }
  },
);

export const addRequest = createAsyncThunk(
  'requests/addRequestsStatus',
  async (request, thunkAPI) => {
    const res = await fetch(serverPath + 'requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(StatusLoading.ERROR);
    }
  },
);

export const putRequest = createAsyncThunk(
  'requests/putRequestsStatus',
  async (request, thunkAPI) => {
    const res = await fetch(serverPath + 'requests/' + request.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(StatusLoading.ERROR);
    }
  },
);

export const deleteRequest = createAsyncThunk(
  'requests/deleteRequestsStatus',
  async (id, thunkAPI) => {
    const res = await fetch(serverPath + 'requests/' + id, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(StatusLoading.ERROR);
    }
  },
);
