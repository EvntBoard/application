import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import PowerIcon from '@material-ui/icons/Power';
import DeleteIcon from '@material-ui/icons/Delete';

const ConfigPluginItem = ({ module, onDelete }) => {
  const innerOnClickDelete = () => {
    onDelete(module)
  }

  return (
    <Grid item container>
      <Grid container item alignItems='center' xs={1}>
        <PowerIcon color={module.connected ? 'action' : 'error'}/>
      </Grid>
      <Grid container item alignItems='center' xs={2}>{module.evntboard}</Grid>
      <Grid container item alignItems='center' xs={2}>{module.name}</Grid>
      <Grid container item alignItems='center' xs={3}>{module.description}</Grid>
      <Grid container item alignItems='center' xs={3}>{module.repo}</Grid>
      <Grid container item alignItems='center' xs={1}>
        <IconButton onClick={innerOnClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ConfigPluginItem
