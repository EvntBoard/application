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

import { boardFindAll, boardDelete, boardCreate, boardUpdate, boardChangeCurrentBoard, selectors as boardSelectors } from '../../store/board'
import { buttonFindAll, selectors as btnSelectors } from '../../store/button'

import './assets/style.scss'

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
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (data) => {
    if (data.id) {
      dispatch(boardUpdate(data))
    } else {
      dispatch(boardCreate(data))
    }
    setOpen(false)
  }

  const onDelete = async (data) => {
    handleClose()
    dispatch(boardDelete(data))
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
    dispatch(boardCreate({
      id: null,
      name: `Board #${size(boards)}`,
      description: "",
      image: null,
      color: null,
      width: 5,
      height: 5,
      createdAt: null,
      updatedAt: null,
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
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default GridManager
