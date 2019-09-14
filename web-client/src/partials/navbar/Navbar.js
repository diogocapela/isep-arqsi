import React, { useState } from 'react';
import styled from '@emotion/styled';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import CropRotateIcon from '@material-ui/icons/CropRotate';
import StoreIcon from '@material-ui/icons/Store';
import TrainIcon from '@material-ui/icons/Train';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { withRouter } from 'react-router';
import { useAuth } from 'redux/redux-auth';
import { usePermissions } from 'redux/redux-permissions';
import { FACTORY_LINKS, PRODUCTION_LINKS, VISUALIZATION_LINKS } from 'config/data';
import Link from 'components/link';

const ListTitleH1 = styled.h1`
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 0.45rem;
  padding-left: 1rem;
`;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    color: 'lightgrey',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const EmailSpan = styled.span`
  background: transparent;
`;

const Navbar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, isAdmin, profile, logout } = useAuth();
  const {
    canViewOrders,
    canViewFactory,
    canViewProduction,
    canViewVisualization,
    canViewProfile,
  } = usePermissions();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderLeftDrawer = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <br />
      <ListTitleH1>LAPR5 G03</ListTitleH1>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {canViewOrders && (
          <>
            <ListItem button component={Link} to="/orders">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button component={Link} to="/production-planning">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Production Planning" />
            </ListItem>
          </>
        )}
      </List>
      {canViewFactory && (
        <>
          <ListTitleH1>Factory</ListTitleH1>
          <Divider />
          <List>
            {FACTORY_LINKS.map(({ title, url }, index) => (
              <ListItem button key={url} component={Link} to={url}>
                <ListItemIcon>
                  {index === 0 && <AccountTreeIcon />}
                  {index === 1 && <SettingsIcon />}
                  {index === 2 && <CropRotateIcon />}
                  {index === 3 && <TrainIcon />}
                  {index === 4 && <AccountTreeIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {canViewProduction && (
        <>
          <ListTitleH1>Production</ListTitleH1>
          <Divider />
          <List>
            {PRODUCTION_LINKS.map(({ title, url }, index) => (
              <ListItem button key={url} component={Link} to={url}>
                <ListItemIcon>
                  {index === 0 && <ReceiptIcon />}
                  {index === 1 && <StoreIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {canViewVisualization && (
        <>
          <ListTitleH1>Visualization</ListTitleH1>
          <Divider />
          <List>
            {VISUALIZATION_LINKS.map(({ title, url }, index) => (
              <ListItem button key={url} component={Link} to={url}>
                <ListItemIcon>
                  {index === 0 && <HomeWorkIcon />}
                  {index === 1 && <HomeWorkIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? (
        <div>
          {canViewProfile && (
            <MenuItem to="/profile" component={Link}>
              Profile
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem to="/settings" component={Link}>
              Settings
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              logout();
              props.history.push('/');
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem to="/auth/login" component={Link}>
            Login
          </MenuItem>
          <MenuItem to="/auth/register" component={Link}>
            Register
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <>
          {canViewProfile && (
            <MenuItem to="/profile" component={Link}>
              Profile
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem to="/settings" component={Link}>
              Settings
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              logout();
              props.history.push('/');
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem to="/auth/login" component={Link}>
            Login
          </MenuItem>
          <MenuItem to="/auth/register" component={Link}>
            Register
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <StyledLink to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              LAPR5 G03
            </Typography>
          </StyledLink>
          <div className={classes.search}>
            <EmailSpan>
              {isAuthenticated && (
                <>
                  <b>Logged-in as:</b> {get(profile, 'email')}
                </>
              )}
            </EmailSpan>
            {/*
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              disabled={true}
              onClick={() => props.history.push('/')}
            />
            */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              as={Link}
              to="/profile"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {renderLeftDrawer()}
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(Navbar);
