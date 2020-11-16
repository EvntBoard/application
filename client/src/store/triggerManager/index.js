import { find, filter, orderBy } from 'lodash'
import { createAction, createReducer } from '@reduxjs/toolkit'

export * as selectors from './selector'

const PATH = 'TRIGGER_MANAGER'

export const triggerManagerOnData = createAction(`${PATH}_ON_DATA`)

export const triggerManagerReload = createAction(`${PATH}_RELOAD`)

export const triggerManagerOnNew = createAction(`${PATH}_ON_NEW`)
export const triggerManagerOnStart = createAction(`${PATH}_ON_START`)
export const triggerManagerOnEnd = createAction(`${PATH}_ON_END`)
export const triggerManagerOnError = createAction(`${PATH}_ON_ERROR`)

const INITIAL_STATE = {
  data: {},
  events: []
}

const reducer = createReducer(INITIAL_STATE, {
  [triggerManagerOnData]: (state, action) => {
    console.log(action)
  },
  [triggerManagerReload]: () => {
    return INITIAL_STATE
  },
  [triggerManagerOnNew]: (state, action) => {
    state.events.push({
      ...action.payload,
      meta: {
        ...action.payload.meta,
        status: 'new',
        error: {}
      }
    })
  },
  [triggerManagerOnStart]: (state, action) => {
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
  [triggerManagerOnEnd]: (state, action) => {
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
  [triggerManagerOnError]: (state, action) => {
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
