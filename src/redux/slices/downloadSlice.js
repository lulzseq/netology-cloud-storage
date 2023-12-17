import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const downloadFile = createAsyncThunk(
  'downloadFile',
  async (fileId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/files/${fileId}`);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('API response error:', errorMessage);
        throw new Error("Network response was not ok");
      }

      const fileData = await response.json();
      const fileUrl = fileData.file;
      const fileResponse = await fetch(fileUrl);

      if (!fileResponse.ok) {
        const errorMessage = await fileResponse.text();
        console.error('File response error:', errorMessage);
        throw new Error("Network response was not ok");
      }

      const data = await fileResponse.blob();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', fileData.filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  }
);

export const downloadSlice = createSlice({
  name: 'downloadFile',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => { },
});

export default downloadSlice.reducer;
