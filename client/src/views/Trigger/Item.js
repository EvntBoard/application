import React from 'react'
import { IconButton, Menu, MenuItem, Chip, Typography } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import RefreshIcon from '@material-ui/icons/Refresh';
import cx from 'clsx'
import { useIntl } from 'react-intl'

import M from '../../messages/constants'

const options = {
  1: 'CLASSIC',
  2: 'THROTTLE',
  3: 'QUEUE',
  4: 'QUEUE LOCK',
}

const TriggerItem = ({ trigger, onClick, onDupplicate, onReload, onEditFile, onDelete, active }) => {
  const intl = useIntl()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const innerOnClick = () => {
    handleClose()
    onClick(trigger)
  }

  const innerOnClickDelete = () => {
    handleClose()
    onDelete(trigger)
  }

  const innerOnDupplicate = () => {
    handleClose()
    onDupplicate(trigger)
  }

  const innerOnReload = () => {
    handleClose()
    onReload(trigger)
  }

  const innerOnEditFile = () => {
    handleClose()
    onEditFile(trigger)
  }

  return (
    <div className={cx('item', { active })}>
      <div className='content' onClick={innerOnClick}>
        <span>{trigger.name}</span>
        <div className='tags'><Chip color="primary" label={options[trigger.type]} /></div>
      </div>
      <div className='actions'>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><MoreHorizIcon /></IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={innerOnReload}><RefreshIcon /><Typography>{intl.formatMessage({ id: M.AppTriggerMenuReload })}</Typography></MenuItem>
          <MenuItem onClick={innerOnEditFile}><InsertDriveFileIcon /><Typography>{intl.formatMessage({ id: M.AppTriggerMenuEditFile })}</Typography></MenuItem>
          <MenuItem onClick={innerOnDupplicate}><FileCopyIcon /><Typography>{intl.formatMessage({ id: M.AppTriggerMenuDupplicate })}</Typography></MenuItem>
          <MenuItem onClick={innerOnClick}><EditIcon />{intl.formatMessage({ id: M.AppTriggerMenuEdit })}</MenuItem>
          <MenuItem onClick={innerOnClickDelete}><DeleteIcon />{intl.formatMessage({ id: M.AppTriggerMenuDelete })}</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default TriggerItem
