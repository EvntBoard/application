import { createSelector } from '@reduxjs/toolkit'
import { filter } from 'lodash'

import { selectors } from '../board'

export const basic = state => state.button

export const buttons = createSelector(
  basic,
  state => state.buttons
)

export const loading = createSelector(
  basic,
  state => state.buttonFindAllLoading
)

export const buttonsForCurrentBoards = createSelector(
  buttons,
  selectors.currentId,
  (buttons, idBoard) => filter(buttons, { idBoard })
)
