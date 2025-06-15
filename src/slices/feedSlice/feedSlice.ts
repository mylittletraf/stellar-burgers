import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  feedData: TOrdersData;
  error: string | null;
  loading: boolean;
};

export const initialState: TFeedState = {
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null,
  loading: false
};

export const getFeedOrders = createAsyncThunk('feed/orders', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedOrders.fulfilled, (state, action) => {
        state.feedData = action.payload;
        state.loading = false;
      })
      .addCase(getFeedOrders.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      });
  }
});

export const { getFeedState } = feedSlice.selectors;
export default feedSlice.reducer;
