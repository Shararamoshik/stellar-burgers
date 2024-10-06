import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { orderMockData } from '../mockData';
import {
  ordersSlice,
  initialState,
  clearModalOrder,
  getCurrentOrder,
  getModalOrder,
  getOrderRequest,
  loadOrderById,
  placeNewOrder
} from '../ordersSlice';

describe('Тест слайса ordersSlice', () => {
  test('очистка модалки заказа', () => {
    const nextState = ordersSlice.reducer(
      orderMockData,
      clearModalOrder()
    );
  
    expect(nextState.modalOrder).toBeNull();
  });

  test('селекторы  getCurrentOrder, getModalOrder, getOrderRequest', () => {
    const store = configureStore({
      reducer: {
        orders: ordersSlice.reducer
      },
      preloadedState: {
        orders: orderMockData
      }
    });
    const currentOrder = getCurrentOrder(store.getState());
    const modalOrder = getModalOrder(store.getState());
    const orderLoading = getOrderRequest(store.getState());

    expect(currentOrder).toEqual(orderMockData.currentOrder);
    expect(modalOrder).toEqual(orderMockData.modalOrder);
    expect(orderLoading).toEqual(orderMockData.loading);
  });

  test('экшен Request редьюсера loadOrderById', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      loadOrderById.pending('', 1)
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  test('экшен Failed редьюсера loadOrderById', () => {
    const action = {
      type: loadOrderById.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = ordersSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера loadOrderById', () => {
    const action = {
      type: loadOrderById.fulfilled.type,
      payload: { orders: [orderMockData.currentOrder] }
    };
    const nextState = ordersSlice.reducer(initialState, action);

    expect(nextState.currentOrder).toEqual(orderMockData.currentOrder);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
  });

  test('экшен Request редьюсера placeNewOrder', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      placeNewOrder.pending('', [])
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  test('экшен Failed редьюсера placeNewOrder', () => {
    const action = {
      type: placeNewOrder.rejected.type,
      error: { message: 'Ошибка при отправке данных' }
    };
    const nextState = ordersSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при отправке данных');
  });

  test('экшен Success редьюсера placeNewOrder', () => {
    const action = {
      type: placeNewOrder.fulfilled.type,
      payload: { order: orderMockData.modalOrder }
    };
    const nextState = ordersSlice.reducer(initialState, action);

    expect(nextState.modalOrder).toEqual(orderMockData.modalOrder);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
  });
});
