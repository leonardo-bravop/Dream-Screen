import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendLoginRequest = createAsyncThunk("LOGIN", (userData) => {
  return axios.post("/api/user/login", userData).then((res) => res.data);
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", () => {
  return axios.post("/api/user/logout").then((res) => res.data);
});

export const persistUser = createAsyncThunk("PERSIST", () => {
  return axios.get("/api/user/me").then((res) => res.data);
});

export const sendSignUpRequest = createAsyncThunk("REGISTER", (userData) => {
  return axios.post("/api/user/register", userData).then((res) => res.data);
});

export const addToFavoriteMovies = createAsyncThunk(
  "ADD_FAVORITE_MOVIES",
  (object, thunkAPI) => {
    const { user } = thunkAPI.getState();
    return axios
      .put(
        `/api/user/favorites?userId=${user.id}&mediaType=${object.mediaType}&mediaId=${object.mediaId}`
      )
      .then((res) => res.data);
  }
);

export const RemoveFromFavorites = createAsyncThunk(
  "REMOVE_FROM_FAVORITE",
  (object, thunkAPI) => {
    const { user } = thunkAPI.getState();
    return axios
      .delete(
        `/api/user/favorites?userId=${user.id}&mediaType=${object.mediaType}&MediaId=${object.mediaId}`
      )
      .then((res) => res.data);
  }
);

const userReducer = createReducer(
  {},
  {
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginRequest.rejected]: (state, action) => {
      return { error: "Invalid credentials" };
    },
    [sendSignUpRequest.fulfilled]: (state, action) => action.payload,
    [sendSignUpRequest.rejected]: (state, action) => {
      return { error: "Invalid data values" };
    },
    [sendLogoutRequest.fulfilled]: (state, action) => {
      return {};
    },
    [persistUser.fulfilled]: (state, action) => action.payload,
    [addToFavoriteMovies.fulfilled]: (state, action) => action.payload[1][0],
    [RemoveFromFavorites.fulfilled]: (state, action) => action.payload[1][0],
  }
);

export default userReducer;
