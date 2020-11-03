import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as langSaga } from './saga'
export * as selectors from './selector'

const PATH = 'LANG'

export const langGet = createAction(`${PATH}_GET`)
export const langGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const langGetFailed = createAction(`${PATH}_GET_FAILED`)

export const langSet = createAction(`${PATH}_SET`)
export const langSetSuccess = createAction(`${PATH}_SET_SUCCESS`)
export const langSetFailed = createAction(`${PATH}_SET_FAILED`)

const INITIAL_STATE = {
  // REAL DATA
  lang: 'en',

  // STATE MANAGEMENT

  // get
  langGetLoading: false,
  langGetSuccess: false,
  langGetFailed: false,
  langGetError: {},

  // set
  langSetLoading: false,
  langSetSuccess: false,
  langSetFailed: false,
  langSetError: {},
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

  // SET
  [langSet]: (state) => {
    state.langSetLoading = true
    state.langSetSuccess = false
    state.langSetFailed = false
    state.langSetError = {}
  },
  [langSetSuccess]: (state, action) => {
    state.langSetLoading = false
    state.langSetSuccess = true
    state.lang = action.payload
  },
  [langSetFailed]: (state, action) => {
    state.langSetLoading = false
    state.langSetFailed = true
    state.langSetError = action.payload
  },
})

export default reducer
