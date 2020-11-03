import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as themeSaga } from './saga'
export * as selectors from './selector'

const PATH = 'THEME'

export const themeGet = createAction(`${PATH}_GET`)
export const themeGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const themeGetFailed = createAction(`${PATH}_GET_FAILED`)

export const themeSet = createAction(`${PATH}_SET`)
export const themeSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const themeSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  theme: 'dark',

  // STATE MANAGEMENT

  // get
  themeGetLoading: false,
  themeGetSuccess: false,
  themeGetFailed: false,
  themeGetError: {},

  // set
  themeSetLoading: false,
  themeSetSuccess: false,
  themeSetFailed: false,
  themeSetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [themeGet]: (state) => {
    state.themeGetLoading = true
    state.themeGetSuccess = false
    state.themeGetFailed = false
    state.themeGetError = {}
  },
  [themeGetSuccess]: (state, action) => {
    state.themeGetLoading = false
    state.themeGetSuccess = true
    state.theme = action.payload
  },
  [themeGetFailed]: (state, action) => {
    state.themeGetLoading = false
    state.themeGetFailed = true
    state.themeGetError = action.payload
  },

  // SET
  [themeSet]: (state) => {
    state.themeSetLoading = true
    state.themeSetSuccess = false
    state.themeSetFailed = false
    state.themeSetError = {}
  },
  [themeSetSuccess]: (state, action) => {
    state.themeSetLoading = false
    state.themeSetSuccess = true
    state.theme = action.payload
  },
  [themeSetFailed]: (state, action) => {
    state.themeSetLoading = false
    state.themeSetFailed = true
    state.themeSetError = action.payload
  },
})

export default reducer
