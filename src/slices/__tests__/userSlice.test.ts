import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { user, updatedUser, userMockData, userRegisterData } from '../mockData';
import {
  userSlice,
  initialState,
  authCheck,
  getIsAuthChecked,
  getUser,
  getError,
  registerUser,
  loginUser,
  loadUser,
  updateUser,
  logoutUser
} from '../userSlice';

describe('Тест слайса user', () => {
  it('изменение authCheck', () => {
    const nextState = userSlice.reducer(initialState, authCheck());
    
    expect(initialState.isAuthChecked).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
  });
  test('селекторы  getIsAuthChecked, getUser, getError', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    });
    const isAuthChecked = getIsAuthChecked(store.getState());
    const user = getUser(store.getState());
    const error = getError(store.getState());

    expect(isAuthChecked).toEqual(userMockData.isAuthChecked);
    expect(user).toEqual(userMockData.user);
    expect(error).toEqual(userMockData.error);
  });

  test('экшен Request редьюсера registerUser', () => {
    const nextState = userSlice.reducer(
      initialState,
      registerUser.pending('', userRegisterData)
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe('');
  });

  test('экшен Failed редьюсера registerUser', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка при отправке данных' }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при отправке данных');
  });

  test('экшен Success редьюсера registerUser', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.user).toEqual(user);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('');
  });

  test('экшен Request редьюсера loginUser', () => {
    const nextState = userSlice.reducer(
      initialState,
      loginUser.pending('', userRegisterData)
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe('');
  });

  test('экшен Failed редьюсера loginUser', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка при отправке данных' }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при отправке данных');
  });

  test('экшен Success редьюсера loginUser', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.user).toEqual(user);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('');
  });

  test('экшен Request редьюсера loadUser', () => {
    const nextState = userSlice.reducer(initialState, loadUser.pending(''));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe('');
  });

  test('экшен Failed редьюсера loadUser', () => {
    const action = {
      type: loadUser.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера loadUser', () => {
    const action = {
      type: loadUser.fulfilled.type,
      payload: { user }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.user).toEqual(user);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('');
  });

  test('экшен Request редьюсера updateUser', () => {
    const nextState = userSlice.reducer(
      initialState,
      updateUser.pending('', userRegisterData)
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe('');
  });

  test('экшен Failed редьюсера updateUser', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка при обновлении данных' }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при обновлении данных');
  });

  test('экшен Success редьюсера updateUser', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const stateAfterLogin = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { user }
    });
    const nextState = userSlice.reducer(stateAfterLogin, action);

    expect(nextState.user).toEqual(updatedUser);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('');
  });

  test('экшен Request редьюсера logoutUser', () => {
    const nextState = userSlice.reducer(
      initialState,
      logoutUser.pending('')
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe('');
  });

  test('экшен Failed редьюсера logoutUser', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Ошибка при загрузке данных' }
    };
    const nextState = userSlice.reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка при загрузке данных');
  });

  test('экшен Success редьюсера logoutUser', () => {
    const action = { type: logoutUser.fulfilled.type };
    const stateAfterLogin = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { user }
    });
    const nextState = userSlice.reducer(stateAfterLogin, action);

    expect(nextState.user).toBeNull();
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('');
  });
});
