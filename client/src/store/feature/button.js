import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  boardFindAll as IPCboardFindAll,
  boardFindOne as IPCboardFindOne,
  boardCreate as IPCboardCreate,
  boardDelete as IPCboardDelete,
  boardUpdate as IPCboardUpdate,
} from '../../service/boardService'

const initialState = {
  status: 'idle',
  error: {},
  boards: [],
}

export const boardFindAll = createAsyncThunk('boards/findAll', async () => {
  return await IPCboardFindAll()
})

export const boardFindOne = createAsyncThunk('boards/findOne', async (id) => {
  return await IPCboardFindOne(id)
})

const todosSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    [boardFindAll.pending]: (state) => {
      if (state.status.read === 'idle') {
        state.status.read = 'loading'
      }
    },
    [boardFindAll.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'succeeded'
        state.boards = [
          ...action.payload
        ]
      }
    },
    [boardFindAll.rejected]: (state, action) => {
      if (state.status === 'failed') {
        state.status = 'idle'
        state.error = action.error
      }
    }
  }
})

export const {  } = todosSlice.actions

export default todosSlice.reducer
