import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

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
import ImportExportIcon from '@material-ui/icons/ImportExport';
import HelpIcon from '@material-ui/icons/Help';

import { menuGet, menuSet, selectors as menuSelectors } from '../../../store/menu'
import M from '../../../messages/constants'
import Logo from '../../../assets/logo.png'
import { useStyles } from './styles'

const Menu = () => {
  const dispatch = useDispatch()
  const open = useSelector(menuSelectors.open)
  const classes = useStyles()
  const intl = useIntl()
  const { pathname } = useLocation()
  const [activeItem, setActiveItem] = useState('home')

  useEffect(() => {
    dispatch(menuGet())
  }, [dispatch])

  useEffect(() => {
    let pathnameNormalize = pathname.split('/').filter((i) => i !== null && i !== "")[0]

    if (pathnameNormalize === undefined) {
      pathnameNormalize = 'home'
    }

    setActiveItem(pathnameNormalize)
  }, [pathname])

  const handleDrawerClose = () => {
    dispatch(menuSet(!open));
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={Logo} alt='logo' />
      </div>
      <List className={clsx(classes.fullgrow)}>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/" selected={activeItem === 'home'}>
          <ListItemIcon className={classes.menuItemColor}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuHome })} />
        </ListItem>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/board" selected={activeItem === 'board'}>
          <ListItemIcon className={classes.menuItemColor}>
            <GridOnIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuBoard })} />
        </ListItem>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/trigger" selected={activeItem === 'trigger'}>
          <ListItemIcon className={classes.menuItemColor}>
            <SettingsInputAntennaIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuTrigger })} />
        </ListItem>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/debug" selected={activeItem === 'debug'}>
          <ListItemIcon className={classes.menuItemColor}>
            <ImportExportIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuDebug })} />
        </ListItem>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/help" selected={activeItem === 'help'}>
          <ListItemIcon className={classes.menuItemColor}>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuHelp })} />
        </ListItem>
      </List>
      <List>
        <ListItem classes={{ selected: classes.listItemColor }} button component={Link} to="/config" selected={activeItem === 'config'}>
          <ListItemIcon className={classes.menuItemColor}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuItemColor} primary={intl.formatMessage({ id: M.AppMenuSettings })} />
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem button onClick={handleDrawerClose}>
          <ListItemIcon className={classes.menuItemColor}>
            { open ? <ChevronLeftIcon /> : <ChevronRightIcon />  }
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Menu
