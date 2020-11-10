import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import {
  Grid,
  Container,
  Typography,
  Button,
} from '@material-ui/core'

import Item from './Item'
import { pluginRemove, pluginGet, pluginAdd, selectors as pluginSelectors } from "../../store/plugin";
import ModalAdd from './ModalAdd'
import M from '../../messages/constants'

const Trigger = () => {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const modules = useSelector(pluginSelectors.plugins)

  useEffect(() => {
    dispatch(pluginGet())
  }, [dispatch])

  const onDeleteTrigger = (data) => {
    dispatch(pluginRemove(data))
  }

  const onSubmit = ({ repo }) => {
    dispatch(pluginAdd(repo))
    setOpen(false)
  }

  const onReset = () => {
    console.log('onReset')
    setOpen(false)
  }

  const onOpenModalAdd = () => {
    setOpen(true)
  }

  return (
    <>
      <ModalAdd
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        onReset={onReset}
        current={{}}
      />
      <Container className='plugin'>
        <Grid container>
          <Grid container item xs={12}>
            <Grid style={{ flexGrow: 1 }}>
              <Typography variant='h4'>{intl.formatMessage({ id: M.AppSettingsPluginTitle })}</Typography>
            </Grid>
            <Grid>
              <Button variant='contained' onClick={onOpenModalAdd}>{intl.formatMessage({ id: M.AppSettingsPluginButtonAdd })}</Button>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item>
              <Grid item xs={1} />
              <Grid item xs={2}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginPath })}</Typography></Grid>
              <Grid item xs={2}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginName })}</Typography></Grid>
              <Grid item xs={3}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginDescription })}</Typography></Grid>
              <Grid item xs={3}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginRepo })}</Typography></Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid container item>
              {modules.map(i => <Item
                key={i.evntboard}
                module={i}
                onDelete={onDeleteTrigger}
              />)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Trigger
