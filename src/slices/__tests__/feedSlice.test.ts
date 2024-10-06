import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { feedsMockData } from '../mockData';
import {
  feedSlice,
  initialState,
  getFeeds,
  getTotal,
  getTotalToday,
  loadFeeds
} from '../feedSlice';

describe('Тест слайса feed', () => {
  test('селекторы  getFeeds, getTotal, getTotalToday', () => {
    const store = configureStore({
      reducer: {
        feed: feedSlice.reducer
      },
      preloadedState: {
        feed: feedsMockData
      }
    });
    const orders = getFeeds(store.getState());
    const total = getTotal(store.getState());
    const totalToday = getTotalToday(store.getState());

    expect(orders).toEqual(feedsMockData.orders);
    expect(total).toEqual(feedsMockData.total);
    expect(totalToday).toEqual(feedsMockData.totalToday);
  });

  test('экшен Request редьюсера loadFeeds', () => {
    const nextState = feedSlice.reducer(
      initialState,
      loadFeeds.pending('')
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('экшен Failed редьюсера loadFeeds', () => {
    const action = {
      type: loadFeeds.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = feedSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера loadFeeds', () => {
    const action = {
      type: loadFeeds.fulfilled.type,
      payload: feedsMockData
    };
    const nextState = feedSlice.reducer(initialState, action);

    expect(nextState).toEqual(feedsMockData);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });
});
