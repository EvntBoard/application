import { find, filter, orderBy } from 'lodash'
import { createAction, createReducer } from '@reduxjs/toolkit'

export { saga as eventHistorySaga } from './saga'
export * as selectors from './selector'

const PATH = 'EVENT_HISTORY'

export const eventHistoryGet = createAction(`${PATH}_GET`)
export const eventHistoryGetSuccess = createAction(`${PATH}_GET_SUCCESS`)
export const eventHistoryGetFailed = createAction(`${PATH}_GET_FAILED`)

export const eventHistoryReload = createAction(`${PATH}_RELOAD`)

export const eventHistoryOnNew = createAction(`${PATH}_ON_NEW`)
export const eventHistoryOnStart = createAction(`${PATH}_ON_START`)
export const eventHistoryOnEnd = createAction(`${PATH}_ON_END`)
export const eventHistoryOnError = createAction(`${PATH}_ON_ERROR`)

const INITIAL_STATE = {
  events: [],

  // get
  eventHistoryGetLoading: false,
  eventHistoryGetSuccess: false,
  eventHistoryGetFailed: false,
  eventHistoryGetError: {},
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

  [eventHistoryReload]: () => {
    return INITIAL_STATE
  },
  [eventHistoryOnNew]: (state, action) => {
    state.events.push({
      ...action.payload,
      meta: {
        ...action.payload.meta,
        status: 'new',
        error: {}
      }
    })
  },
  [eventHistoryOnStart]: (state, action) => {
    const currentEvent = find(state.events, (i) => i.meta.uniqueId === action.payload.meta.uniqueId)
    const newEvents = [
      ...filter(state.events, i => i.meta.uniqueId !== action.payload.meta.uniqueId),
      {
        ...currentEvent,
        ...action.payload,
        meta: {
          ...currentEvent.meta,
          ...action.payload.meta,
          status: 'start',
        }
      }
    ]

    state.events = orderBy(newEvents, ['meta.newDate'], 'desc')
  },
  [eventHistoryOnEnd]: (state, action) => {
    const currentEvent = find(state.events, (i) => i.meta.uniqueId === action.payload.meta.uniqueId)
    const newEvents = [
      ...filter(state.events, i => i.meta.uniqueId !== action.payload.meta.uniqueId),
      {
        ...currentEvent,
        ...action.payload,
        meta: {
          ...currentEvent.meta,
          ...action.payload.meta,
          status: 'end',
        }
      }
    ]
    state.events = orderBy(newEvents, ['meta.newDate'], 'desc')
  },
  [eventHistoryOnError]: (state, action) => {
    const currentEvent = find(state.events, (i) => i.meta.uniqueId === action.payload.meta.uniqueId)
    const newEvents = [
      ...filter(state.events, i => i.meta.uniqueId !== action.payload.meta.uniqueId),
      {
        ...currentEvent,
        ...action.payload,
        meta: {
          ...currentEvent.meta,
          ...action.payload.meta,
          status: 'error',
          error: action.payload.error,
        }
      }
    ]
    state.events = orderBy(newEvents, ['meta.newDate'], 'desc')
  },
})

export default reducer
