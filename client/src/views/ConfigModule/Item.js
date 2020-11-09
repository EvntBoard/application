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


const ModuleItem = ({ module, onClick, onDelete, active }) => {
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
    onClick(module)
  }

  const innerOnClickDelete = () => {
    handleClose()
    onDelete(module)
  }

  return (
    <div className={cx('item', { active })}>
      <div className='content' onClick={innerOnClick}>
        <span>{module.name}</span>
      </div>
      <div className='actions'>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><MoreHorizIcon /></IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={innerOnClick}><EditIcon />Edit</MenuItem>
          <MenuItem onClick={innerOnClickDelete}><DeleteIcon />Delete</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default ModuleItem
