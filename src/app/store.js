import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import misEventosReducer from "../features/misEventos";

export const store = configureStore({
  reducer: {
    user: userReducer,
    misEventos: misEventosReducer,
  },
});
