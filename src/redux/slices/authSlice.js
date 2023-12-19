import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ username, password }) => {
    const response = await fetch(`http://127.0.0.1:8000/register/`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid data');
    }

    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data.user));
    return data
  }
)


export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/login/`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid data');
      }

      const data = await response.json();
      sessionStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message || 'Login failed';
    }); 
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error.message || 'Signup failed';
    });
  },
});


export default authSlice.reducer;
