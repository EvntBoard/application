import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Fab, DialogContent, Typography, Grid as MuiGrid, Chip, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import QrCode from 'qrcode.react';

import Grid from './components/Grid'
import { boardFindAll, selectors as boardSelectors } from '../../store/board'
import { buttonFindAll, selectors as buttonSelectors } from '../../store/button'
import { triggerManageNewEvent } from '../../service/triggerManagerService'
import { webServerGetUrl, webServerOpenApp } from '../../service/webServerService'

import './assets/style.scss'

const Board = () => {
  const dispatch = useDispatch()
  const currentBoard = useSelector(boardSelectors.getCurrent)
  const currentButtons = useSelector(buttonSelectors.buttonsGetCurrentForTM)
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    dispatch(boardFindAll())
    dispatch(buttonFindAll())
  }, [dispatch])

  useEffect(() => {
    webServerGetUrl().then((data) => {
      setUrl(data)
    })
  }, [])

  const onClick = (data) => {
    triggerManageNewEvent({
      event: 'click',
      idButton: data.id,
      idTrigger: data.idTrigger,
    })
  }

  const onOpenHelp = () => {
    setOpen(true)
  }

  const onCloseHelp = () => {
    setOpen(false)
  }

  const onOpenApp = () => {
    webServerOpenApp()
  }

  if (!currentBoard) {
    return null
  }

  return (
    <>
      <Dialog open={open} onClose={onCloseHelp} fullWidth >
        <DialogContent>
          <MuiGrid container style={{ textAlign: 'center' }}>
            <MuiGrid item sm={5}>
              <Typography variant='h5'>QR Code</Typography>
                <div style={{ padding: 16, backgroundColor: 'white', width: 160, borderRadius: 25, margin: 'auto' }}>
                  <QrCode value={url} />
                </div>
            </MuiGrid>
            <MuiGrid container item sm={2}>
              <Chip style={{ margin: 'auto' }} label='OR' color='primary' />
            </MuiGrid>
            <MuiGrid item sm={5}>
              <Typography variant='h5'>URL</Typography>
              <Button variant='contained' onClick={onOpenApp}>{url}</Button>
            </MuiGrid>
          </MuiGrid>
        </DialogContent>
      </Dialog>
      <div className="home">
        { currentBoard.color && <div className='bg-color' style={{ backgroundColor: currentBoard.color }} />}
        { currentBoard.image && <img className='bg-image' src={currentBoard.image} alt='bg-board' />}
        <Grid
          board={currentBoard}
          buttons={currentButtons}
          onClick={onClick}
        />
        <Fab className='fab' style={{ position: 'absolute', bottom: 20, right: 20 }} color="primary" aria-label="add" onClick={onOpenHelp}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

export default Board;
