import React, { useMemo } from 'react'
import { find, filter } from 'lodash'
import { template } from 'grid-template-parser'

import Button from './Button'
import { newToOld } from '../utils'
import { useAppContext } from '../../../context'

const Preview = ({ onClick }) => {
  const { state } = useAppContext()

  const currentBoardId = useMemo(() => { return state[`${state.id}_current_board`] || state.default_board }, [ state ])
  const board = useMemo(() => find(state.boards, { id: currentBoardId }), [ state, currentBoardId ])
  const buttons = useMemo(() => filter(state.buttons, i => i.id_board === currentBoardId), [ state, currentBoardId ])

  const tpl = useMemo(() => {
    if (board) {
      return template({
        width: board.width,
        height: board.height,
        areas: buttons ? buttons.reduce((acc, i) => ({ ...acc, [i.id]: newToOld(i) }), {}) : {}
      })
    }
    return null
  }, [board, buttons])

  if (!tpl) {
    return null
  }

  return (
    <div
      className='grid'
      style={{
        gridTemplateColumns: `repeat(${board.width}, ${100 / board.width}%)`,
        gridTemplateRows: `repeat(${board.height}, ${100 / board.height}%)`,
        gridTemplateAreas: `${tpl}`,
      }}
    >
      {buttons && buttons.map(button => (
        <Button
          onClick={onClick}
          key={button.id}
          button={button}
        />
      ))}
    </div>
  );
}

export default Preview
