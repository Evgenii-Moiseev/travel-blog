import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { postsApiSlice } from './postsApiSlice'
import { authApiSlice } from './authApiSlice'
import { authSlice } from './authSlice'
import { userApiSlice } from './userApiSlice'
import { saveAuthState } from './localStorage'

const rootReducer = combineSlices(postsApiSlice, authApiSlice, authSlice, userApiSlice )

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postsApiSlice.middleware,
      authApiSlice.middleware,
      userApiSlice.middleware
    ]),
})

store.subscribe(() => {
  const state = store.getState();
  saveAuthState(state.auth);
});

export type RootState = ReturnType<typeof store.getState>
