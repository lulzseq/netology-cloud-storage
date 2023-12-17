import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteFile = createAsyncThunk(
  'deleteFile',
  async (fileId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/files/${fileId}`, {
        method: 'DELETE',
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  })

export const deleteSlice = createSlice({
  name: 'deleteFile',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => { },
})

export default deleteSlice.reducer