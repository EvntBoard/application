import { createSelector } from '@reduxjs/toolkit'
import { find, filter } from 'lodash'

import { buttons } from '../button/selector'
import { boards } from '../board/selector'

import { currentBoardsData, currentButtonsData } from '../cache/selector'


const basic = state => state.session

export const currentBoard = createSelector(
  basic,
  state => state.currentBoardId
)

export const getCurrentButtonsForSession = createSelector(
  buttons,
  currentBoard,
  currentButtonsData,
  (buttons, idBoard, datas) => {
    const buttonsData = filter(buttons, { idBoard })

    return buttonsData.map((button) => {
      const buttonData = find(datas, { id: button.id })
      return {
        ...button,
        ...buttonData
      }
    })
  }
)

export const getCurrentBoardForSession = createSelector(
  boards,
  currentBoard,
  currentBoardsData,
  (boards, id, boardsData) => {
    const board = find(boards, { id })
    const boardData = find(boardsData, { id })

    return {
      ...board,
      ...boardData
    }
  }
)
