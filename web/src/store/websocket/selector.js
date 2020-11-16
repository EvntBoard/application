import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.websocket

export const connected = createSelector(
  basic,
  state => state.connected
)

export const id = createSelector(
  basic,
  state => state.id
)
