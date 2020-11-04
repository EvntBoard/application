import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as langSaga } from './saga'
export * as selectors from './selector'

const PATH = 'LANG'

export const langGet = createAction(`${PATH}_GET`)
export const langGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const langGetFailed = createAction(`${PATH}_GET_FAILED`)

export const langOnChange = createAction(`${PATH}_ON_CHANGE`)

const INITIAL_STATE = {
  // REAL DATA
  lang: 'en',

  // STATE MANAGEMENT

  // get
  langGetLoading: false,
  langGetSuccess: false,
  langGetFailed: false,
  langGetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [langGet]: (state) => {
    state.langGetLoading = true
    state.langGetSuccess = false
    state.langGetFailed = false
    state.langGetError = {}
  },
  [langGetSuccess]: (state, action) => {
    state.langGetLoading = false
    state.langGetSuccess = true
    state.lang = action.payload
  },
  [langGetFailed]: (state, action) => {
    state.langGetLoading = false
    state.langGetFailed = true
    state.langGetError = action.payload
  },

  // On change
  [langOnChange]: (state, action) => {
    state.lang = action.payload
  }
})

export default reducer
