import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as menuSaga } from './saga'
export * as selectors from './selector'

const PATH = 'MENU'

export const menuGet = createAction(`${PATH}_GET`)
export const menuGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const menuGetFailed = createAction(`${PATH}_GET_FAILED`)

export const menuSet = createAction(`${PATH}_SET`)
export const menuSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const menuSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  open: false,

  // STATE MANAGEMENT

  // get
  menuGetLoading: false,
  menuGetSuccess: false,
  menuGetFailed: false,
  menuGetError: {},

  // set
  menuSetLoading: false,
  menuSetSuccess: false,
  menuSetFailed: false,
  menuSetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [menuGet]: (state) => {
    state.menuGetLoading = true
    state.menuGetSuccess = false
    state.menuGetFailed = false
    state.menuGetError = {}
  },
  [menuGetSuccess]: (state, action) => {
    state.menuGetLoading = false
    state.menuGetSuccess = true
    state.open = action.payload
  },
  [menuGetFailed]: (state, action) => {
    state.menuGetLoading = false
    state.menuGetFailed = true
    state.menuGetError = action.payload
  },

  // SET
  [menuSet]: (state) => {
    state.menuSetLoading = true
    state.menuSetSuccess = false
    state.menuSetFailed = false
    state.menuSetError = {}
  },
  [menuSetSuccess]: (state, action) => {
    state.menuSetLoading = false
    state.menuSetSuccess = true
    state.open = action.payload
  },
  [menuSetFailed]: (state, action) => {
    state.menuSetLoading = false
    state.menuSetFailed = true
    state.menuSetError = action.payload
  },
})

export default reducer
