import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ordersMockData } from '../mockData';
import {
  userOrdersSlice,
  initialState,
  getUserOrders,
  loadUserOrders
} from '../userOrdersSlice';

describe('Тест слайса userOrders', () => {
  test('селектор  getUserOrders', () => {
    const store = configureStore({
      reducer: {
        userOrders: userOrdersSlice.reducer
      },
      preloadedState: {
        userOrders: ordersMockData
      }
    });
    const orders = getUserOrders(store.getState());

    expect(orders).toEqual(ordersMockData.orders);
  });

  test('экшен Request редьюсера loadUserOrders', () => {
    const nextState = userOrdersSlice.reducer(
      initialState,
      loadUserOrders.pending('')
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('экшен Failed редьюсера loadUserOrders', () => {
    const action = {
      type: loadUserOrders.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = userOrdersSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера loadUserOrders', () => {
    const action = {
      type: loadUserOrders.fulfilled.type,
      payload: ordersMockData.orders
    };
    const nextState = userOrdersSlice.reducer(initialState, action);

    expect(nextState.orders).toEqual(ordersMockData.orders);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });
});
