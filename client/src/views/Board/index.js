import React, {useEffect, useMemo, useState} from 'react'
import { size, get, find, remove } from 'lodash'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {boardCreate, boardFindAll, boardUpdate} from '../../service/boardService'
import Grid from './Grid'
import Preview from './Preview'

import './assets/style.scss'
import { buttonFindAllForBoardId } from '../../service/buttonService'
import ModalBoardSettings from '../../components/Modal/ModalBoardSettings'

const GridManager = () => {
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState()
  const [buttons, setButtons] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    boardFindAll().then((data) => {
      setBoards(data)
      if (size(data) > 0) {
        const currentBoard = get(data, 0)
        if (currentBoard) {
          setCurrentBoardId(currentBoard.id)
        }
      }
    })
  }, [])

  useEffect(() => {
    buttonFindAllForBoardId(currentBoardId).then((data) => {
      setButtons(data)
    })
  }, [currentBoardId])

  const currentBoard = useMemo(() => {
    return find(boards, { id: currentBoardId })
  }, [currentBoardId, boards])

  const onSubmit = async (data) => {
    let result
    if (data.id) {
      result = await boardUpdate(data)
    } else {
      result = await boardCreate(data)
    }
    setBoards([
      ...remove(boards, (i) => i.id !== result.id),
      result
    ])
    setOpen(false)
  }

  const onReset = () => {
    setOpen(false)
  }

  if (!currentBoard) {
    return null
  }

  return (
    <>
      <ModalBoardSettings open={open} setOpen={setOpen} onSubmit={onSubmit} onReset={onReset} current={currentBoard} />
      <div className='grid-manager'>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h5">
              {currentBoard.name}
            </Typography>
            <IconButton onClick={() => { setOpen(true) }}>
              <EditIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='grid-main'>
          <Grid
            width={currentBoard.width}
            height={currentBoard.height}
          />
          {
            currentBoard && (
              <Preview
                board={currentBoard}
                buttons={buttons}
                setButtons={setButtons}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default GridManager
