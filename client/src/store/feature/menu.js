import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { menuGet as ipcMenuGet, menuSet as ipcMenuSet } from '../../service/menuService'

const initialState = false

export const menuGet = createAsyncThunk('menu/get', async () => {
  return await ipcMenuGet()
})

export const menuSet = createAsyncThunk('menu/set', async (menu) => {
  return await ipcMenuSet(menu)
})

const todosSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: {
    [menuGet.fulfilled]: (state, action) => {
      return action.payload
    },
    [menuGet.rejected]: (state, action) => {
      return false
    },
    [menuSet.fulfilled]: (state, action) => {
      return action.payload
    },
    [menuSet.rejected]: (state, action) => {
      return false
    }
  }
})

export const { } = todosSlice.actions

export default todosSlice.reducer
