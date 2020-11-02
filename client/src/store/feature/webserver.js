import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { webServerGetStatus } from '../../service/webServerService'

const initialState = {
  connected: false,
  error: {},
}

export const getStatus = createAsyncThunk('webserver/get_status', async () => {
  return await webServerGetStatus()
})

const webserverSlice = createSlice({
  name: 'webserver',
  initialState,
  reducers: {
    onOpen(state) {
      state.connected = true
    },
    onClose(state) {
      state.connected = false
    },
    onError(state) {
      state.connected = false
    },
  },
  extraReducers: {
    [getStatus.fulfilled]: (state, action) => {
      state.connected = action.payload
    },
    [getStatus.rejected]: (state) => {
      state.connected = false
    }
  }
})

export const { onOpen, onClose, onError } = webserverSlice.actions

export default webserverSlice.reducer
