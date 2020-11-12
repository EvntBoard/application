import React, {useEffect, useState} from 'react'
import { Grid, IconButton } from '@material-ui/core'
import PowerIcon from '@material-ui/icons/Power';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';

import { pluginManagerInfo, pluginManagerReload } from '../../service/pluginManagerService'

const ConfigPluginItem = ({ module, onDelete }) => {
  const [pluginData, setPluginData] = useState({})

  useEffect(() => {
    if (module) {
      pluginManagerInfo(module).then(data => {
        setPluginData(data)
      })
    }
  }, [module])

  const innerOnClickDelete = () => {
    onDelete(module)
  }

  const innerOnClickReload = () => {
    pluginManagerReload(module).then(() => {
      pluginManagerInfo(module).then(data => {
        setPluginData(data)
      })
    })
  }

  return (
    <Grid item container>
      <Grid container item alignItems='center' xs={1}>
        <PowerIcon color={pluginData?.evntboard ? 'action' : 'error'}/>
      </Grid>
      <Grid container item alignItems='center' xs={2}>{pluginData?.evntboard}</Grid>
      <Grid container item alignItems='center' xs={2}>{pluginData?.name}</Grid>
      <Grid container item alignItems='center' xs={2}>{pluginData?.description}</Grid>
      <Grid container item alignItems='center' xs={3}>{module}</Grid>
      <Grid container item alignItems='center' xs={1}>
        <IconButton onClick={innerOnClickReload}>
          <CachedIcon />
        </IconButton>
      </Grid>
      <Grid container item alignItems='center' xs={1}>
        <IconButton onClick={innerOnClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ConfigPluginItem
