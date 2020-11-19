import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as eventHistorySaga } from './saga'
export * as selectors from './selector'

const PATH = 'EVENT_HISTORY'

export const eventHistoryGet = createAction(`${PATH}_GET`)
export const eventHistoryGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const eventHistoryGetFailed = createAction(`${PATH}_GET_FAILED`)

export const eventHistoryProcessGet = createAction(`${PATH}_PROCESS_GET`)
export const eventHistoryProcessGetSuccess = createAction(`${PATH}_PROCESS_GET_SUCCESS`)
export const eventHistoryProcessGetFailed = createAction(`${PATH}_PROCESS_GET_FAILED`)

export const eventHistoryOnNew = createAction(`${PATH}_ON_NEW`)
export const eventHistoryProcessOnStart = createAction(`${PATH}_PROCESS_ON_START`)
export const eventHistoryProcessOnEnd = createAction(`${PATH}_PROCESS_ON_END`)
export const eventHistoryProcessOnError = createAction(`${PATH}_PROCESS_ON_ERROR`)

const keyToMapKey = (key) => {
  return `${key.idTrigger}:${key.idEvent}`
}

const INITIAL_STATE = {
  events: [],
  process: new Map(),

  // get
  eventHistoryGetLoading: false,
  eventHistoryGetSuccess: false,
  eventHistoryGetFailed: false,
  eventHistoryGetError: {},

  // get
  eventHistoryProcessGetLoading: false,
  eventHistoryProcessGetSuccess: false,
  eventHistoryProcessGetFailed: false,
  eventHistoryProcessGetError: {},
}

const reducer = createReducer(INITIAL_STATE, {
  // GET
  [eventHistoryGet]: (state) => {
    state.eventHistoryGetLoading = true
    state.eventHistoryGetSuccess = false
    state.eventHistoryGetFailed = false
    state.eventHistoryGetError = {}
  },
  [eventHistoryGetSuccess]: (state, action) => {
    state.eventHistoryGetLoading = false
    state.eventHistoryGetSuccess = true
    state.events = action.payload
  },
  [eventHistoryGetFailed]: (state, action) => {
    state.eventHistoryGetLoading = false
    state.eventHistoryGetFailed = true
    state.eventHistoryGetError = action.payload
    state.events = []
  },

  // GET PROCESS
  [eventHistoryProcessGet]: (state) => {
    state.eventHistoryProcessGetLoading = true
    state.eventHistoryProcessGetSuccess = false
    state.eventHistoryProcessGetFailed = false
    state.eventHistoryProcessGetError = {}
  },
  [eventHistoryProcessGetSuccess]: (state, action) => {
    state.eventHistoryProcessGetLoading = false
    state.eventHistoryProcessGetSuccess = true
    state.process = action.payload
  },
  [eventHistoryProcessGetFailed]: (state, action) => {
    state.eventHistoryProcessGetLoading = false
    state.eventHistoryProcessGetFailed = true
    state.eventHistoryProcessGetError = action.payload
    state.process = new Map()
  },


  [eventHistoryOnNew]: (state, action) => {
    state.events.push(action.payload)
  },

  [eventHistoryProcessOnStart]: (state, action) => {
    state.process.set(keyToMapKey(action.payload.key), action.payload.value)
  },
  [eventHistoryProcessOnEnd]: (state, action) => {
    state.process.set(keyToMapKey(action.payload.key), action.payload.value)
  },
  [eventHistoryProcessOnError]: (state, action) => {
    state.process.set(keyToMapKey(action.payload.key), action.payload.value)
  },
})

export default reducer
