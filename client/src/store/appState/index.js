import { createAction, createReducer } from '@reduxjs/toolkit'

export * as selectors from './selector'

const PATH = 'APP_STATE'

export const appStateChangeCurrentBoard = createAction(`${PATH}_CHANGE_CURRENT_BOARD`)
export const appStateOnData = createAction(`${PATH}_ON_DATA`)

const INITIAL_STATE = {
  currentBoardId: null,
  data: {}
}

const reducer = createReducer(INITIAL_STATE, {
  [appStateChangeCurrentBoard]: (state, action) => {
    state.currentBoardId = action.payload.id
  },
  [appStateOnData]: (state, action) => {
    console.log(action)
  }
})

export default reducer
