import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import requests from './slices/requestsSlice';
import edit from './slices/editSlice';

export const store = configureStore({
  reducer: { filter, requests, edit },
});
