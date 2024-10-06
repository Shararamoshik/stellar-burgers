import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { feedSlice } from '../slices/feedSlice';
import { ordersSlice } from '../slices/ordersSlice';
import { userSlice } from '../slices/userSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
