import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.triggerManager

export const events = createSelector(
  basic,
  state => state.events
)
