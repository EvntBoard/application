import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { size } from 'lodash'
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

import {
  boardFindAll,
  boardDelete,
  boardCreate,
  boardUpdate,
  boardChangeCurrentBoard,
  selectors as boardSelectors,
  boardSetDefault
} from '../../store/board'
import { buttonFindAll, selectors as btnSelectors } from '../../store/button'

import './assets/style.scss'

const SAMPLE_BOARD = {
  id: null,
  name: '',
  description: '',
  default: false,
  image: null,
  color: null,
  width: 5,
  height: 5,
  createdAt: null,
  updatedAt: null,
}

const GridManager = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const boards = useSelector(boardSelectors.boards)
  const currentBoard = useSelector(boardSelectors.getCurrent)
  const loadingBoard = useSelector(boardSelectors.findAllLoading)

  const buttons = useSelector(btnSelectors.buttonsGetCurrent)
  const loadingButton = useSelector(btnSelectors.findAllLoading)

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(boardFindAll())
    dispatch(buttonFindAll())
  }, [dispatch])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (data) => {
    if (data.id) {
      dispatch(boardUpdate({...SAMPLE_BOARD, ...data}))
    } else {
      dispatch(boardCreate({...SAMPLE_BOARD, ...data}))
    }
    setOpen(false)
  }

  const onDelete = async (data) => {
    dispatch(boardDelete(data))
    setOpenDelete(false)
    handleClose()
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

  const handleBoardUpdateDefault = () => {
    handleClose()
    dispatch(boardSetDefault(currentBoard))
  }

  const handleBoardDelete = () => {
    handleClose()
    setOpenDelete(true)
  }

  const handleAddBoard = () => {
    handleClose()
    dispatch(boardCreate({
      ...SAMPLE_BOARD,
      name: `Board #${size(boards) + 1}`,
    }))
  }

  const handleSwitchBoard = (board) => {
    dispatch(boardChangeCurrentBoard(board))
  }

  if (loadingBoard || loadingButton || !currentBoard) {
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
              <MenuItem disabled={currentBoard.default} onClick={handleBoardUpdateDefault}><PublishIcon /> {intl.formatMessage({ id: M.AppBoardActionSetDefault })}</MenuItem>
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
                    <MenuItem key={i.id} onClick={innerHandleSwitchBoard} selected={i?.id === currentBoard?.id}><GridOnIcon color={i.default ? 'primary' : 'inherit'}/> {i.name}</MenuItem>
                  )
                })
              }
            </Menu>
          </Toolbar>
        </AppBar>
        <div className='grid-main'>
          { currentBoard?.color && (<div className='bg-color' style={{ backgroundColor: currentBoard.color }} />)}
          { currentBoard?.image && (<img className='bg-image' src={currentBoard.image}  alt='bg-grid' />)}
          <Grid
            width={currentBoard.width}
            height={currentBoard.height}
          />
          {
            currentBoard && (
              <Preview
                board={currentBoard}
                buttons={buttons}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default GridManager
