import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Fab, DialogContent, Typography, Grid as MuiGrid, Chip, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import QrCode from 'qrcode.react';
import { useIntl } from 'react-intl'

import Grid from './components/Grid'
import { cacheGet} from '../../store/cache'
import { sessionGet, selectors } from '../../store/session'
import { boardFindAll } from '../../store/board'
import { buttonFindAll } from '../../store/button'
import { eventBusNewEvent } from '../../service/eventBusService'
import { webServerGetUrl, webServerOpenApp } from '../../service/webServerService'
import M from '../../messages/constants'

import './assets/style.scss'

const Board = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const currentBoard = useSelector(selectors.getCurrentBoardForSession)
  const currentButtons = useSelector(selectors.getCurrentButtonsForSession)
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    dispatch(boardFindAll())
    dispatch(buttonFindAll())
    dispatch(sessionGet())
    dispatch(cacheGet())
  }, [dispatch])

  useEffect(() => {
    webServerGetUrl().then((data) => {
      setUrl(data)
    })
  }, [])

  const onClick = (data) => {
    eventBusNewEvent('click', {
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
              <Typography variant='h5'>{intl.formatMessage({ id: M.AppMainQrCode })}</Typography>
                <div style={{ padding: 16, backgroundColor: 'white', width: 160, borderRadius: 25, margin: 'auto' }}>
                  <QrCode value={url} />
                </div>
            </MuiGrid>
            <MuiGrid container item sm={2}>
              <Chip style={{ margin: 'auto' }} label={intl.formatMessage({ id: M.AppMainOr })} color='primary' />
            </MuiGrid>
            <MuiGrid item sm={5}>
              <Typography variant='h5'>{intl.formatMessage({ id: M.AppMainURL })}</Typography>
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
