import { createSlice } from "@reduxjs/toolkit";

const connectionReducer = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnection: () => null,
  },
});

export const { addConnections, removeConnection } = connectionReducer.actions;
export default connectionReducer.reducer;


