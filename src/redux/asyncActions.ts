import { createAsyncThunk } from '@reduxjs/toolkit';
import { Request } from '../types';
import { serverPath } from '../utils/variables';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequestsStatus',
  async (params: string, thunkAPI) => {
    try {
      const res = await fetch(serverPath + 'requests' + params);

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Ошибка при загрузке с сервера, статус ошибки: ${res.status}`,
        );
      }
      return (await res.json()) as Request[];
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const getRequestById = createAsyncThunk(
  'requests/getRequestsStatus',
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(serverPath + 'requests/' + id);

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Ошибка при загрузке с сервера, статус ошибки: ${res.status}`,
        );
      }
      return (await res.json()) as Request;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const addRequest = createAsyncThunk(
  'requests/addRequestsStatus',
  async (
    request: {
      name: string;
      phone: string;
      email: string;
      product: string;
      date: string;
      status: string;
    },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(serverPath + 'requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Ошибка при сохранении на сервере, статус ошибки: ${res.status}`,
        );
      }
      return (await res.json()) as Request;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const putRequest = createAsyncThunk(
  'requests/putRequestsStatus',
  async (request: Request, thunkAPI) => {
    try {
      const res = await fetch(`${serverPath}requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Ошибка при сохранении на сервере, статус ошибки: ${res.status}`,
        );
      }
      return (await res.json()) as Request;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const deleteRequest = createAsyncThunk(
  'requests/deleteRequestsStatus',
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`${serverPath}requests/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue(`Ошибка при удалении заявки, статус ошибки: ${res.status}`);
      }
      return (await res.json()) as Request;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  },
);
