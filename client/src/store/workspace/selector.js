import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.workspace

export const workspace = createSelector(
  basic,
  state => state.workspace
)
