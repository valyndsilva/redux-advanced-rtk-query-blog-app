import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from '../features/posts/postsSlice';
import { apiSlice } from '../features/api/apiSlice';
// import usersReducer from '../features/users/usersSlice';
export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // users: usersReducer,
  },
  //required when using rtk query and an apiSlice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // manages cache lifetimes and expirations.
});
