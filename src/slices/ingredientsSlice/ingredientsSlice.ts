import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type TIngredientsListState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsListState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload ?? [];
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      });
  }
});

export const { getIngredientsState } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
