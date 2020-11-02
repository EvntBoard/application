import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { themeGet as ipcThemeGet, themeSet as ipcThemeSet } from '../../service/themeService'

const initialState = 'dark'

export const themeGet = createAsyncThunk('theme/get', async () => {
  return await ipcThemeGet()
})

export const themeSet = createAsyncThunk('theme/set', async (theme) => {
  return await ipcThemeSet(theme)
})

const todosSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: {
    [themeGet.fulfilled]: (state, action) => {
      return action.payload
    },
    [themeGet.rejected]: (state, action) => {
      return 'dark'
    },
    [themeSet.fulfilled]: (state, action) => {
      return action.payload
    },
    [themeSet.rejected]: (state, action) => {
      return 'dark'
    }
  }
})

export const { } = todosSlice.actions

export default todosSlice.reducer
