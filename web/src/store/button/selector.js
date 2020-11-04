import { createSelector } from '@reduxjs/toolkit'

export const basic = state => state.button

export const buttons = createSelector(
  basic,
  state => state.buttons
)

export const loading = createSelector(
  basic,
  state => state.buttonFindAllLoading
)
