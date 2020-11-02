import React, {useEffect, useMemo, useState} from 'react'
import { useIntl } from 'react-intl'
import { size, get, find, remove, filter, first } from 'lodash'
import { IconButton, Menu, MenuItem, Toolbar, AppBar, Typography, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GridOnIcon from '@material-ui/icons/GridOn';
import PublishIcon from '@material-ui/icons/Publish';
import M from '../../messages/constants';

import Grid from './Grid'
import Preview from './Preview'
import ModalBoard from '../../components/Modal/ModalBoard'
import ModalBoardDelete from '../../components/Modal/ModalBoardDelete'
import {boardCreate, boardDelete, boardFindAll, boardUpdate} from '../../service/boardService'
import {buttonFindAllForBoardId} from '../../service/buttonService'

import './assets/style.scss'

const GridManager = () => {
  const intl = useIntl()
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState()
  const [buttons, setButtons] = useState([])
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
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

  const onDelete = async (data) => {
    handleClose()
    boardDelete(data).then(() => {
      setOpenDelete(false)
      const newBoards = filter(boards, i => i.id !== data.id)
      setBoards(newBoards)
      setCurrentBoardId(get(first(newBoards), 'id'))
    })
  }

  const onReset = () => {
    handleClose()
    setOpen(false)
  }

  const onResetDelete = () => {
    setOpenDelete(false)
  }

  const handleBoardUpdate = () => {
    handleClose()
    setOpen(true)
  }

  const handleBoardDelete = () => {
    handleClose()
    setOpenDelete(true)
  }

  const handleAddBoard = () => {
    handleClose()
    boardCreate({
      id: null,
      name: `Board #${size(boards)}`,
      description: "",
      image: null,
      color: null,
      width: 5,
      height: 5,
      createdAt: null,
      updatedAt: null,
    }).then((data) => {
      setBoards([
        ...boards,
        data
      ])
      setCurrentBoardId(data.id)
    })
  }

  const handleSwitchBoard = (board) => {
    if (board.id) {
      setCurrentBoardId(board.id)
    }
  }

  if (!currentBoard) {
    return null
  }

  return (
    <>
      <ModalBoard open={open} setOpen={setOpen} onSubmit={onSubmit} onReset={onReset} current={currentBoard} />
      <ModalBoardDelete open={openDelete} setOpen={setOpenDelete} onSubmit={onDelete} onReset={onResetDelete} current={currentBoard} />
      <div className='grid-manager'>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h5">
              {intl.formatMessage({ id: M.AppBoardTitle })} {currentBoard.name}
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
              <MenuItem onClick={handleAddBoard}><AddIcon /> {intl.formatMessage({ id: M.AppBoardActionCreate })}</MenuItem>
              <Divider />
              <MenuItem disabled onClick={handleBoardUpdate}><PublishIcon /> {intl.formatMessage({ id: M.AppBoardActionSetDefault })}</MenuItem>
              <MenuItem onClick={handleBoardUpdate}><EditIcon /> {intl.formatMessage({ id: M.AppBoardActionUpdate })}</MenuItem>
              <MenuItem disabled={size(boards) <= 1} onClick={handleBoardDelete}><DeleteIcon /> {intl.formatMessage({ id: M.AppBoardActionDelete })}</MenuItem>
              <Divider />
              {
                boards.map(i => {
                  const innerHandleSwitchBoard = () => {
                    handleClose()
                    handleSwitchBoard(i)
                  }
                  return (
                    <MenuItem key={i.id} onClick={innerHandleSwitchBoard}><GridOnIcon/> {i.name}</MenuItem>
                  )
                })
              }
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
