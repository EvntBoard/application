import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.debugConfig

export const config = createSelector(
  basic,
  state => state.config
)
