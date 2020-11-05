import { createSelector } from '@reduxjs/toolkit'
import { find } from 'lodash'

import { boards } from '../board/selector'

const basic = state => state.triggerManager

export const events = createSelector(
  basic,
  state => state.events
)

export const currentId = createSelector(
  basic,
  state => state.currentBoardId
)

export const getCurrent = createSelector(
  boards,
  currentId,
  (boards, id) => find(boards, { id })
)
