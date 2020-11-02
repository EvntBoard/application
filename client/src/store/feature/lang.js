import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { langSet as ipcLangSet, langGet as ipcLangGet } from '../../service/langService'

const initialState = 'fr'

export const langGet = createAsyncThunk('lang/get', async () => {
  return await ipcLangGet()
})

export const langSet = createAsyncThunk('lang/set', async (lang) => {
  return await ipcLangSet(lang)
})

const todosSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {},
  extraReducers: {
    [langGet.fulfilled]: (state, action) => {
      return action.payload
    },
    [langGet.rejected]: (state, action) => {
      return 'en'
    },
    [langSet.fulfilled]: (state, action) => {
      return action.payload
    },
    [langSet.rejected]: (state, action) => {
      return 'en'
    }
  }
})

export const { } = todosSlice.actions

export default todosSlice.reducer
