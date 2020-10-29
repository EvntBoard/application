import React, {useEffect, useMemo, useState} from 'react'
import { size, get, find, remove } from 'lodash'
import { IconButton, Menu, MenuItem, Toolbar, AppBar, Typography, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from './Grid'
import Preview from './Preview'
import ModalBoardSettings from '../../components/Modal/ModalBoardSettings'
import { boardCreate, boardFindAll, boardUpdate } from '../../service/boardService'
import { buttonFindAllForBoardId } from '../../service/buttonService'

import './assets/style.scss'

const GridManager = () => {
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState()
  const [buttons, setButtons] = useState([])
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    if (currentBoardId) {
      buttonFindAllForBoardId(currentBoardId).then((data) => {
        setButtons(data)
      })
    }
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

  const handleBoardUpdate = () => {
    handleClose()
    setOpen(true)
  }

  const handleBoardDelete = () => {
    handleClose()
    setOpen(true)
  }

  const handleAddBoard = () => {
    console.log('add a board')
    handleClose()
    setOpen(true)
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
            <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleBoardUpdate}>Edit current board</MenuItem>
              <MenuItem onClick={handleBoardDelete}>Delete current board</MenuItem>
              <Divider />
              <MenuItem onClick={handleAddBoard}>Add board</MenuItem>
            </Menu>
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
