import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7)
  },
  fullgrow: {
    flexGrow: 1
  },
  logoContainer: {
    textAlign: 'center'
  },
  logo: {
    height: 42,
    width: 42
  },
  menuItemColor: {
    color: theme.palette.common.white
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)'
  },
  listItemColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)'
  }
}));
