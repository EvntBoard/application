import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as themeSaga } from './saga'
export * as selectors from './selector'

const PATH = 'THEME'

export const themeGet = createAction(`${PATH}_GET`)
export const themeGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const themeGetFailed = createAction(`${PATH}_GET_FAILED`)

export const themeOnChange = createAction(`${PATH}_ON_CHANGE`)

const INITIAL_STATE = {
  // REAL DATA
  theme: 'dark',

  // STATE MANAGEMENT

  // get
  themeGetLoading: false,
  themeGetSuccess: false,
  themeGetFailed: false,
  themeGetError: {},
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

  // On change
  [themeOnChange]: (state, action) => {
    state.theme = action.payload
  }
})

export default reducer
