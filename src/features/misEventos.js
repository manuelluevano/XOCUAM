import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventos: [],
};

export const EventoSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    setEventosRedux: (state, action) => {
      state.eventos = action.payload;
    },
    addEventosReducer: (state, action) => {
      // The unshift() method adds one or more elements to the beginning of an array and returns the new length
      // of the array.
      // state.posts = state.posts.unshift(action.payload);
      state.eventos = [action.payload, ...state.eventos];
    },
    deleteEventosReducer: (state, action) => {
      const idEventosToDelete = action.payload;
      // The filter() method creates a shallow copy of a portion of a given array,
      // filtered down to just the elements from the given array that pass the test
      // implemented by the provided function.
      state.eventos = state.eventos.filter(
        (event) => event.eventsubscriptionid !== idEventosToDelete
      ); // create a new array with all posts except for the one that we want to delete
    },
  },
});

export const { setEventosRedux, addEventosReducer, deleteEventosReducer } =
  EventoSlice.actions;
export default EventoSlice.reducer;
