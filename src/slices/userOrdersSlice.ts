import { getOrdersApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface TUserOrdersState {
  orders: Array<TOrder>;
  loading: boolean;
  error: string | null;
}

export const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      });
  }
});

export const loadUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  getOrdersApi
);

export const { getUserOrders } = userOrdersSlice.selectors;
