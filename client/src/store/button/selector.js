import { createSelector } from '@reduxjs/toolkit'
import { filter } from 'lodash'

import { selectors } from '../board'
import { selectors as appStateSelectors } from '../appState'

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

export const buttonsGetCurrentForAppState = createSelector(
  buttons,
  appStateSelectors.currentId,
  (buttons, idBoard) => filter(buttons, { idBoard })
)

export const findAllLoading = createSelector(
  basic,
  state => state.buttonFindAllLoading
)

