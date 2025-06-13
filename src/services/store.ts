import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../slices/ingredientsSlice/';
import constructorSlice from '../slices/constructorSlice/';
import feedSlice from '../slices/feedSlice/';
import userSlice from '../slices/userSlice/';
import ordersSlice from '../slices/ordersSlice/';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  constructorBurger: constructorSlice,
  user: userSlice,
  feed: feedSlice,
  orders: ordersSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
