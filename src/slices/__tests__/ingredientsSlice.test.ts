import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsMockData } from '../mockData';
import {
  ingredientsSlice,
  initialState,
  getIngredients,
  getIngredientsLoading,
  loadIngredients
} from '../ingredientsSlice';

describe('Тест слайса ingredients', () => {
  test('селекторы  getIngredients, getIngredientsLoading', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: ingredientsMockData
      }
    });
    const ingredients = getIngredients(store.getState());
    const ingredientsLoading = getIngredientsLoading(store.getState());

    expect(ingredients).toEqual(ingredientsMockData.ingredients);
    expect(ingredientsLoading).toEqual(ingredientsMockData.loading);
  });

  test('экшен Request редьюсера loadIngredients', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      loadIngredients.pending('')
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('экшен Failed редьюсера loadIngredients', () => {
    const action = {
      type: loadIngredients.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = ingredientsSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера loadIngredients', () => {
    const action = {
      type: loadIngredients.fulfilled.type,
      payload: ingredientsMockData.ingredients
    };
    const nextState = ingredientsSlice.reducer(initialState, action);

    expect(nextState.ingredients).toEqual(ingredientsMockData.ingredients);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });
});