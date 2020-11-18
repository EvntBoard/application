import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.eventHistory

export const events = createSelector(
  basic,
  state => state.events
)
