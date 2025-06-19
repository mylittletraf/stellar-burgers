import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  loading: boolean;
  error: string | null;
  response: TUser | null;
  registerData: TRegisterData | null;
  userData: TUser | null;
  isAuthenticated: boolean;
};

export const initialState: TUserState = {
  loading: true,
  error: null,
  response: null,
  registerData: null,
  userData: null,
  isAuthenticated: false
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.response = action.payload.user;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload.user;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.response = action.payload.user;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error has occurred';
        state.loading = false;
      });
  }
});

export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
