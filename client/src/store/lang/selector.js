import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.lang

export const lang = createSelector(
  basic,
  state => state.lang
)
