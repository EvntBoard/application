import { createSelector } from '@reduxjs/toolkit'
import { filter } from 'lodash'

import { selectors } from '../board'

export const basic = state => state.button

export const buttons = createSelector(
  basic,
  state => state.buttons
)

export const buttonsGetCurrent = createSelector(
  buttons,
  selectors.currentId,
  (buttons, idBoard) => filter(buttons, { idBoard })
)

export const findAllLoading = createSelector(
  basic,
  state => state.buttonFindAllLoading
)

