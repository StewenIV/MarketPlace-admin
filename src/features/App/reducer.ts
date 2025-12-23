import { createSlice, Dispatch } from '@reduxjs/toolkit'

import { T_AppThunk, T_Reducer } from 'store/types'
import { I_AppStore } from './types'

const initialState: I_AppStore = {
  isLogged: false,
  isAppLoading: false
}

export const isLoggedReducer: T_Reducer<I_AppStore, boolean> = (
  state,
  action
) => {
  state.isLogged = action.payload
}

export const isAppLoadingReducer: T_Reducer<I_AppStore, boolean> = (
  state,
  action
) => {
  state.isAppLoading = action.payload
}

const appslice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    isLogged: isLoggedReducer,
    isAppLoading: isAppLoadingReducer
  }
})

//action creators
const { isLogged: setIsLoggedAction, isAppLoading: setIsAppLoadingAction } =
  appslice.actions

//сам action
export const setIsLogged =
  (isLogged: boolean): T_AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setIsLoggedAction(isLogged))
  }

export const setIsAppLoading =
  (isApploading: boolean): T_AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setIsAppLoadingAction(isApploading))
  }

export default appslice.reducer
