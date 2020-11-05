import React, { useEffect, useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { isString } from 'lodash'

import {boardFindAll, selectors as boardSelectors} from '../../store/board'
import {buttonFindAll, selectors as buttonSelectors} from '../../store/button'

import Grid from './components/Grid'

import './assets/style.scss'
import {triggerManageNewEvent} from '../../service/triggerManagerService'

const Board = () => {
  const dispatch = useDispatch()
  const currentBoard = useSelector(boardSelectors.getCurrent)
  const currentButtons = useSelector(buttonSelectors.buttonsGetCurrentForAppState)

  useEffect(() => {
    dispatch(boardFindAll())
    dispatch(buttonFindAll())
  }, [dispatch])

  const onClick = (data) => {
    triggerManageNewEvent({
      event: 'click',
      idButton: data.id,
      idTrigger: data.idTrigger,
    })
  }

  if (!currentBoard) {
    return null
  }

  return (
    <div className="home">
      { currentBoard.color && <div className='bg-color' style={{ backgroundColor: currentBoard.color }} />}
      { currentBoard.image && <img className='bg-image' src={currentBoard.image} alt='bg-board' />}
      <Grid
        board={currentBoard}
        buttons={currentButtons}
        onClick={onClick}
      />
    </div>
  );
}

export default Board;
