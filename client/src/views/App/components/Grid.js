import React, { useMemo } from 'react'
import { template } from 'grid-template-parser'

import Button from './Button'
import { newToOld } from '../../Board/utils'

const Grid = ({ board, buttons, onClick }) => {
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

export default Grid
