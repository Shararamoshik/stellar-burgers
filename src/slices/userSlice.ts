import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | undefined;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(loginUser.pending, (state) => {
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(loadUser.pending, (state) => {
        state.error = '';
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logoutUser.pending, (state) => {
        state.error = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const loadUser = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const { authCheck } = userSlice.actions;
export const { getIsAuthChecked, getUser, getError } = userSlice.selectors;
