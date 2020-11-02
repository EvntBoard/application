import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { appConfigGet, appConfigSet } from '../../service/appConfigService'

const initialState = {
  host: '',
  port: 0,
  password: '',
}

export const configGet = createAsyncThunk('config/get', async () => {
  return await appConfigGet()
})

export const configSet = createAsyncThunk('config/set', async (config) => {
  return await appConfigSet(config)
})

const todosSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: {
    [configGet.fulfilled]: (state, action) => {
      return action.payload
    },
    [configGet.rejected]: (state, action) => {
      return initialState
    },
    [configSet.fulfilled]: (state, action) => {
      return action.payload
    },
    [configSet.rejected]: (state, action) => {
      return initialState
    }
  }
})

export const { } = todosSlice.actions

export default todosSlice.reducer
