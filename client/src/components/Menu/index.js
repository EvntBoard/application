import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GridOnIcon from '@material-ui/icons/GridOn';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';

import { useMenuContext } from '../../context/menu'
import { useStyles } from './assets/styles'

const Menu = () => {
  const classes = useStyles();
  const { menu: open, setMenu } = useMenuContext()

  const handleDrawerClose = () => {
    setMenu(!open);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <List className={clsx(classes.fullgrow)}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GridOnIcon />
          </ListItemIcon>
          <ListItemText primary="Board" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsInputAntennaIcon />
          </ListItemIcon>
          <ListItemText primary="Trigger" />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuration" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleDrawerClose}>
          <ListItemIcon>
            { open ? <ChevronLeftIcon /> : <ChevronRightIcon />  }
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Menu
