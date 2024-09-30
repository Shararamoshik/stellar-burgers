import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export interface TFeedState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось получить ленту заказов';
      })
      .addCase(loadFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      });
  }
});

export const loadFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);

export const { getFeeds, getTotal, getTotalToday } = feedSlice.selectors;
