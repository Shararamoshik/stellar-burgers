import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsMockData, constructorMockData } from '../mockData';

import {
  constructorSlice,
  initialState,
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearIngredients,
  selectConstructorBurger
} from '../constructorSlice';

describe('Тест слайса constructor', () => {
  test('добавление ингредиента (булки)', () => {
    const nextState = constructorSlice.reducer(
      initialState,
      addIngredient(ingredientsMockData.ingredients[0])
    );
    const { bun, ingredients } = nextState;

    expect(bun?._id).toEqual(ingredientsMockData.ingredients[0]._id);
    expect(ingredients.length).toBe(0);
  });

  test('добавление ингредиента (начинки)', () => {
    const nextState = constructorSlice.reducer(
      initialState,
      addIngredient(ingredientsMockData.ingredients[1])
    );
    const { bun, ingredients } = nextState;

    expect(bun).toBeNull();
    expect(ingredients[0]._id).toEqual(ingredientsMockData.ingredients[1]._id);
  });

  test('удаление ингредиента', () => {
    const nextState = constructorSlice.reducer(
      constructorMockData,
      removeIngredient(2)
    );
    const { ingredients } = nextState;

    expect(constructorMockData.ingredients.length).toBe(3);
    expect(ingredients.length).toBe(2);
  });

  test('изменение порядка ингредиентов', () => {
    const nextState = constructorSlice.reducer(
      constructorMockData,
      reorderIngredients({ from: 1, to: 0 })
    );

    expect(nextState.ingredients[0]._id).toEqual(
      constructorMockData.ingredients[1]._id
    );
    expect(nextState.ingredients[1]._id).toEqual(
      constructorMockData.ingredients[0]._id
    );
    expect(nextState.ingredients[2]._id).toEqual(
      constructorMockData.ingredients[2]._id
    );
  });

  test('очистка ингредиентов', () => {
    const nextState = constructorSlice.reducer(
      constructorMockData,
      clearIngredients()
    );

    const { bun, ingredients } = nextState;

    expect(bun).toBeNull();
    expect(ingredients.length).toBe(0);
  });

  test('cелектор selectConstructorBurger', () => {
    const store = configureStore({
      reducer: {
        constructorIngredient: constructorSlice.reducer
      },
      preloadedState: {
        constructorIngredient: constructorMockData
      }
    });
    const ingredients = selectConstructorBurger(store.getState());

    expect(ingredients).toEqual(constructorMockData);
  });
});
