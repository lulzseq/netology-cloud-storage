import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./slices/loadSlice";
import downloadReducer from "./slices/downloadSlice";
import uploadReducer from "./slices/uploadSlice";
import deleteReducer from "./slices/deleteSlice";
import renameReducer from "./slices/renameSlice";

export const store = configureStore({
  reducer: {
    load: loadReducer,
    download: downloadReducer,
    upload: uploadReducer,
    delete: deleteReducer,
    rename: renameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
