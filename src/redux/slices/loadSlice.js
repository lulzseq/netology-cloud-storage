import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCookie from "../../utils/getCookie"

const initialState = {
  files: [],
  loading: false,
  error: null,
};

const csrftoken = getCookie('csrftoken')

export const loadFiles = createAsyncThunk(
  "loadFiles",
  async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/files/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken,
        },
        credentials: "include",
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(error);
    }
  });

export const loadSlice = createSlice({
  name: "loadFiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
})

export default loadSlice.reducer