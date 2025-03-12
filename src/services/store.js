import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from './cryptoApi'; // Update path to your API file

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});