import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectors as wsSelectors } from '../../store/websocket'
import { selectors as boardSelectors } from '../../store/board'
import { selectors as buttonSelectors } from '../../store/button'

import Grid from './components/Grid'

import './assets/style.scss'

const Board = () => {
  const navigate = useNavigate()
  const connected = useSelector(wsSelectors.connected)
  const currentBoard = useSelector(boardSelectors.getCurrent)
  const currentButtons = useSelector(buttonSelectors.buttonsForCurrentBoards)

  useEffect(() => {
    if (!connected) {
      navigate('/')
    }
  }, [connected, navigate])

  const onClick = (data) => {
    console.log('on click', data)
  }

  return (
    <div className="home">
      <Grid
        board={currentBoard}
        buttons={currentButtons}
        onClick={onClick}
      />
    </div>
  );
}

export default Board;
