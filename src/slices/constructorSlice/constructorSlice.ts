import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  constructorItems: {
    ingredients: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'user/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.constructorItems.bun = item;
        } else {
          state.constructorItems.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < 0 || index > ingredients.length - 1) return;
      ingredients.splice(index, 0, ingredients.splice(index - 1, 1)[0]);
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < 0 || index > ingredients.length - 1) return;
      ingredients.splice(index, 0, ingredients.splice(index + 1, 1)[0]);
    },

    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    },

    resetModalData: (state) => {
      state.orderModalData = null;
    },

    resetConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },

  selectors: {
    getConstructorState: (state) => state
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        constructorSlice.caseReducers.resetConstructor(state);
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      });
  }
});

export const {
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  setRequest,
  resetModalData,
  resetConstructor
} = constructorSlice.actions;

export const { getConstructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
