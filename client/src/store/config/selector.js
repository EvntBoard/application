import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.config

export const config = createSelector(
  basic,
  state => state.config
)
