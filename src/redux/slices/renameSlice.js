import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const renameFile = createAsyncThunk(
  'renameFile',
  async ({ fileId, newName }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/files/${fileId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: newName }),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
);

const renameSlice = createSlice({
  name: 'renameFile',
  initialState: {
    success: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(renameFile.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.success = true;
        state.error = null;
      } else {
        state.success = false;
        state.error = 'Unexpected response format';
      }
    });
    builder.addCase(renameFile.rejected, (state, action) => {
      state.success = false;
      state.error = action.error.message || 'File renaming failed';
    });
  },
});

export default renameSlice.reducer;
