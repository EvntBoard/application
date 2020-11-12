import { createSelector } from '@reduxjs/toolkit'

export const basic = state => state.plugin

export const plugins = createSelector(
  basic,
  state => state.plugins
)
