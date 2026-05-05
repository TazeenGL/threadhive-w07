import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || 'Login failed' }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await register(formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || 'Registration failed' }
      );
    }
  }
);

const getInitialToken = () => {
  const t = localStorage.getItem('token');
  return t && t !== 'undefined' && t !== 'null' ? t : null;
};

const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getInitialToken(),
    user: getInitialUser(),
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
    },
    clearAuthState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setUser(state, action) {
      const updatedUser = action.payload;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      state.user = updatedUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload?.token) {
          localStorage.setItem('token', action.payload.token);
          state.token = action.payload.token;
        }
        if (action.payload?.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          state.user = action.payload.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Login failed' };
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Registration failed' };
      });
  },
});

export const { logout, clearAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
