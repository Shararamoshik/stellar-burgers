import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

interface TOrdersState {
  currentOrder: TOrder | null;
  modalOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: TOrdersState = {
  currentOrder: null,
  modalOrder: null,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearModalOrder: (state) => {
      state.modalOrder = null;
    }
  },
  selectors: {
    getCurrentOrder: (state) => state.currentOrder,
    getOrderRequest: (state) => state.loading,
    getModalOrder: (state) => state.modalOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderById.pending, (state) => {
        state.loading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(loadOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось получить информацию о заказе';
      })
      .addCase(loadOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.orders[0];
        state.error = null;
      })

      .addCase(placeNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось разместить заказ';
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.order;
        state.error = null;
      });
  }
});

export const loadOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: number) => getOrderByNumberApi(id)
);

export const placeNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export const { clearModalOrder } = ordersSlice.actions;
export const { getCurrentOrder, getOrderRequest, getModalOrder } =
  ordersSlice.selectors;
