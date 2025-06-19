import { getOrdersApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserState = {
  loading: boolean;
  error: string | null;
  orders: TOrder[];
  orderByNumber: TOrder | null;
};

export const initialState: TUserState = {
  loading: false,
  error: null,
  orders: [],
  orderByNumber: null
};

export const getOrders = createAsyncThunk('user/ordersUser', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  getOrderByNumberApi
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      });
  }
});

export const { getOrdersState } = ordersSlice.selectors;
export default ordersSlice.reducer;
