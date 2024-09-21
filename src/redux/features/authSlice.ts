import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/User';

interface AuthState {
  currentUser: UserModel | null;  // Allow currentUser to be null or a UserModel
  isFetching: boolean;
  error: boolean;
}

const initialState: AuthState = {
 
    currentUser: null,  // Start with null
    isFetching: false,
    error: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logoutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    logoutFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    registerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updateUserFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,

  logoutStart,
  logoutSuccess,
  logoutFailed,

  registerStart,
  registerSuccess,
  registerFailed,

  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = authSlice.actions;

export default authSlice.reducer;
