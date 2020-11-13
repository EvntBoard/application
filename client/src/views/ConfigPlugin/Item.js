import React, {useEffect, useState} from 'react'
import { Grid, IconButton } from '@material-ui/core'
import PowerIcon from '@material-ui/icons/Power';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import EditIcon from '@material-ui/icons/Edit';

import { pluginManagerInfo, pluginManagerReload } from '../../service/pluginManagerService'

const ConfigPluginItem = ({ plugin, onDelete, onEdit }) => {
  const [pluginData, setPluginData] = useState(null)

  useEffect(() => {
    pluginManagerInfo(plugin).then((data) => {
      setPluginData(data)
    })
  }, [plugin])

  const innerOnClickDelete = () => {
    onDelete(plugin)
  }

  const innerOnClickReload = () => {
    pluginManagerReload(plugin).then(() => {
      pluginManagerInfo(plugin).then((data) => {
        setPluginData(data)
      })
    })
  }

  const innerOnClickEdit = () => {
    onEdit(plugin)
  }

  return (
    <Grid item container>
      <Grid container item alignItems='center' xs={1}>
        <PowerIcon color={pluginData?.id !== undefined ? 'action' : 'error'}/>
      </Grid>
      <Grid container item alignItems='center' style={{ overflowWrap: 'anywhere' }} xs={1}>{plugin?.type}</Grid>
      <Grid container item alignItems='center' style={{ overflowWrap: 'anywhere' }} xs={2}>{plugin?.name}</Grid>
      <Grid container item alignItems='center' style={{ overflowWrap: 'anywhere' }} xs={2}>{pluginData?.name}</Grid>
      <Grid container item alignItems='center' style={{ overflowWrap: 'anywhere' }} xs={2}>{pluginData?.description}</Grid>
      <Grid container item alignItems='center' style={{ overflowWrap: 'anywhere' }} xs={2}>{pluginData?.id}</Grid>
      <Grid container item alignItems='center' xs={2}>
        <IconButton onClick={innerOnClickReload}>
          <CachedIcon />
        </IconButton>
        <IconButton onClick={innerOnClickEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={innerOnClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ConfigPluginItem
