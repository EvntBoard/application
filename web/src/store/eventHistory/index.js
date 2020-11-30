import { createAction } from '@reduxjs/toolkit'
import { isEqual, filter } from 'lodash'

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

const INITIAL_STATE = {
  events: [],
  process: [],

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

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // GET
    case eventHistoryGet.type:
      return  {
        ...state,
        eventHistoryGetLoading: true,
        eventHistoryGetSuccess: false,
        eventHistoryGetFailed: false,
        eventHistoryGetError: {}
      }
    case eventHistoryGetSuccess.type:
      return {
        ...state,
        eventHistoryGetLoading: false,
        eventHistoryGetSuccess: true,
        events: action.payload
      }

    case eventHistoryGetFailed.type:
      return {
        ...state,
        eventHistoryGetLoading: false,
        eventHistoryGetFailed: true,
        eventHistoryGetError: action.payload,
        events: []
      }

    // GET PROCESS
    case eventHistoryProcessGet.type:
      return {
        ...state,
        eventHistoryProcessGetLoading: true,
        eventHistoryProcessGetSuccess: false,
        eventHistoryProcessGetFailed: false,
        eventHistoryProcessGetError: {}
      }

    case eventHistoryProcessGetSuccess.type:
      return {
        ...state,
        eventHistoryProcessGetLoading: false,
        eventHistoryProcessGetSuccess: true,
        process: action.payload
      }
    case eventHistoryProcessGetFailed.type:
      return {
        ...state,
        eventHistoryProcessGetLoading: false,
        eventHistoryProcessGetFailed: true,
        eventHistoryProcessGetError: action.payload,
        process: []
      }


    case eventHistoryOnNew.type:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }

    case eventHistoryProcessOnStart.type:
      return {
        ...state,
        process: [
          ...state.process,
          action.payload
        ]
      }

    case eventHistoryProcessOnEnd.type:
      return {
        ...state,
        process: [
          ...filter(state.process, (i) => !isEqual(i.key, action.payload.key)),
          action.payload
        ]
      }
    case eventHistoryProcessOnError.type:
      return {
        ...state,
        process: [
          ...filter(state.process, (i) => !isEqual(i.key, action.payload.key)),
          action.payload
        ]
      }

    default:
      return state
  }
}

export default reducer
