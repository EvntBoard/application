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
import { pluginFindAll, pluginDelete, pluginCreate, pluginUpdate, selectors as pluginSelectors } from "../../store/plugin";
import ModalAdd from './ModalAdd'
import ModalDelete from './ModalDelete'
import M from '../../messages/constants'

const Trigger = () => {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [current, setCurrent] = useState(null)
  const dispatch = useDispatch()
  const modules = useSelector(pluginSelectors.plugins)

  useEffect(() => {
    dispatch(pluginFindAll())
  }, [dispatch])

  const onDeleteTrigger = (data) => {
    setCurrent(data)
    setOpenDelete(true)
  }

  const onEditTrigger = (data) => {
    setCurrent(data)
    setOpen(true)
  }

  const onSubmit = (data) => {
    if (data.id) {
      dispatch(pluginUpdate(data))
    } else {
      dispatch(pluginCreate(data))
    }
    setOpen(false)
  }

  const onSubmitDelete = (data) => {
    dispatch(pluginDelete(data))
    setOpenDelete(false)
  }

  const onReset = () => {
    setCurrent(null)
    setOpen(false)
    setOpenDelete(false)
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
        current={current}
      />
      <ModalDelete
        open={openDelete}
        setOpen={setOpenDelete}
        onSubmit={onSubmitDelete}
        onReset={onReset}
        current={current}
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
              <Grid item xs={1} style={{ overflowWrap: 'anywhere' }}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginType })}</Typography></Grid>
              <Grid item xs={2} style={{ overflowWrap: 'anywhere' }}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginRepo })}</Typography></Grid>
              <Grid item xs={2} style={{ overflowWrap: 'anywhere' }}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginName })}</Typography></Grid>
              <Grid item xs={2} style={{ overflowWrap: 'anywhere' }}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginDescription })}</Typography></Grid>
              <Grid item xs={2} style={{ overflowWrap: 'anywhere' }}><Typography variant='h6'>{intl.formatMessage({ id: M.AppSettingsPluginPath })}</Typography></Grid>
              <Grid item xs={2} />
            </Grid>
            <Grid container item>
              {modules.map(item => <Item
                key={item.id}
                plugin={item}
                onDelete={onDeleteTrigger}
                onEdit={onEditTrigger}
              />)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Trigger
