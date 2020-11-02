import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { workspaceGetCurrent, workspaceSwitch } from '../../service/workspaceService'

const initialState = {
  path: null,
  current: true
}

export const workspaceGet = createAsyncThunk('workspace/get', async () => {
  return await workspaceGetCurrent()
})

export const workspaceSet = createAsyncThunk('workspace/set', async (workspace) => {
  return await workspaceSwitch(workspace)
})

const todosSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {},
  extraReducers: {
    [workspaceGet.fulfilled]: (state, action) => {
      return action.payload
    },
    [workspaceGet.rejected]: (state, action) => {
      return null
    },
    [workspaceSet.fulfilled]: (state, action) => {
      return action.payload
    },
    [workspaceSet.rejected]: (state, action) => {
      return null
    }
  }
})

export const { } = todosSlice.actions

export default todosSlice.reducer
