import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.theme

export const theme = createSelector(
  basic,
  state => state.theme
)
