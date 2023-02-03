import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  userName: null,
  lastName: null,
  profilePicture: null,
  email: null,
  notificationToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    resetUser: (state) => {
      return (state = {
        id: null,
        userName: null,
        lastName: null,
        profilePicture: null,
        email: null,
        notificationToken: null,
      });
    },
    resetProfilePicture: (state, action) => {
      return {
        ...state,
        profilePicture: action.payload,
      };
    },
    resetNotificationToken: (state, action) => {
      return {
        ...state,
        notificationToken: action.payload,
      };
    },
  },
});

export const {
  setUser,
  resetUser,
  resetProfilePicture,
  resetNotificationToken,
} = userSlice.actions;
export default userSlice.reducer;
