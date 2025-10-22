import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthResponse, IAuthState } from './types'
import { loadAuthState } from './localStorage'

const initialState: IAuthState = loadAuthState() ?? {
  isAuthenticated: false,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthResponse>) => {
      state.isAuthenticated = true
      state.token = action.payload.token
    },
    deleteUser: (state) => {
      state.isAuthenticated = false
      state.token = null
    },
  },
})

export const { setUser, deleteUser } = authSlice.actions
export default authSlice.reducer
