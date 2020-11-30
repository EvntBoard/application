import { createSelector } from '@reduxjs/toolkit'
import { sortBy, reverse, find } from 'lodash'

const basic = state => state.eventHistory

export const events = createSelector(
  basic,
  state => reverse(sortBy(state.events, [(o) => o.emittedAt]))
)

export const process = createSelector(
  basic,
  state => state.process
)