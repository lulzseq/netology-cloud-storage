import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadFile = createAsyncThunk(
  'uploadFile',
  async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/files/', {
        method: 'POST',
        body: formData
      });
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }
)

export const uploadSlice = createSlice({
  name: 'uploadFile',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => { },
})

export default uploadSlice.reducer