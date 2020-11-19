import { sortBy } from 'lodash'
import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.trigger

export const triggers = createSelector(
  basic,
  state => sortBy(state.triggers, [(o) => new Date(o.createdAt)])
)
