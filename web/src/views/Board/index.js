import React, { useEffect, useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isString } from 'lodash'

import { selectors as wsSelectors, wsCreateEvent } from '../../store/websocket'
import { selectors as sessionSelectors, sessionGet } from '../../store/session'

import Grid from './components/Grid'

import './assets/style.scss'

const Board = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const connected = useSelector(wsSelectors.connected)
  const currentBoard = useSelector(sessionSelectors.getCurrentBoardForSession)
  const currentButtons = useSelector(sessionSelectors.getCurrentButtonsForSession)

  useEffect(() => {
    dispatch(sessionGet())
  }, [])

  useEffect(() => {
    if (!connected) {
      navigate('/')
    }
  }, [connected, navigate])

  const image = useMemo(() => {
    if (currentBoard && isString(currentBoard.image) && currentBoard.image.startsWith('workspace://')) {
      return currentBoard.image.replace('workspace://', `/api/workspace/`)
    }
    return currentBoard?.image
  }, [currentBoard])

  const onClick = (data) => {
    dispatch(wsCreateEvent({
      event: 'click',
      idButton: data.id,
      idTrigger: data.idTrigger
    }))
  }

  if (!currentBoard) {
    return null
  }

  return (
    <div className="home">
      { currentBoard.color && <div className='bg-color' style={{ backgroundColor: currentBoard.color }} />}
      { currentBoard.image && <img className='bg-image' src={image} alt='bg-board' />}
      <Grid
        board={currentBoard}
        buttons={currentButtons}
        onClick={onClick}
      />
    </div>
  );
}

export default Board;
