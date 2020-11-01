import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }
    // const response = await userAPI.userAPI(userId)
    return {}
  }
)


const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const { id, text } = action.payload
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  },
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [fetchUserById.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities.push(action.payload)
        state.currentRequestId = undefined
      }
    },
    [fetchUserById.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    }
  }
})

export const { addTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer
