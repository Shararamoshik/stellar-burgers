import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface TUserOrdersState {
  orders: Array<TOrder>;
  loading: boolean;
}

const initialState: TUserOrdersState = {
  orders: [],
  loading: false
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
      })
      .addCase(loadUserOrders.rejected, (state) => {
        state.loading = false;
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
