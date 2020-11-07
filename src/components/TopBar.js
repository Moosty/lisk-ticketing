import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {TopDrawer} from "components/TopDrawer";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import {useSelector} from "react-redux";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {ticketStatuses} from "../store/reducers/blockchain/portfolio.reducer";

const useStyles = makeStyles((theme) => ({
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
  appbar: {
    backgroundColor: "#000000",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
}));

export const TopBar = withReducer("topBar", reducer)((props) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const basket  = useSelector(({blockchain}) => blockchain.basket.items);
  const [amountOfTicketsBasket, setAmountOfTicketsBasket] = useState(basket.length);

  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const filteredTickets = portfolio.filter((ticket) => ticket.ticketStatus === ticketStatuses.OWNED || ticket.ticketStatus === ticketStatuses.SELLING);
  // AMOUNT OF 'ACTIVE' TICKETS IN PORTFOLIO
  const [amountOfTicketsPortfolio, setAmountOfTicketsPortfolio] = useState(filteredTickets.length);

  useEffect(
    () => {
      // console.log("Topbar basket", basket);
      // console.log("filteredTickets", filteredTickets);
      setAmountOfTicketsPortfolio(filteredTickets.length);
      setAmountOfTicketsBasket(basket.reduce(
        (sum, item) => sum + (item.quantity), 0
      ));
    }, [basket, portfolio],
  );



  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem onClick={()=>
        {handleMenuClose();
        history.push(`/account`);
        }
      }>My account</MenuItem>
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
      <MenuItem
        style={{backgroundColor:"#E91E63", padding:"4rem"}}
        onClick={()=>
      {handleMenuClose();
        history.push(`/signup`);
      }
      }>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <AccountBoxIcon />
          </Badge>
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      <MenuItem onClick={()=>
      {handleMenuClose();
        history.push(`/organiser/organiser01`);

      }}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Organiser</p>
      </MenuItem>
      <MenuItem onClick={()=>
      {handleMenuClose();
        history.push(`/account/account01`);
      }
      }>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <TopDrawer />
          {/*// TODO /account01 verwijderen na DEV fase*/}
          <IconButton onClick={()=> history.push(`/my-tickets/account01`)} aria-label="show 17 new notifications" color="inherit">
          <Badge  badgeContent={amountOfTicketsPortfolio} color="secondary">
            <ConfirmationNumberIcon />
          </Badge>
        </IconButton>
          {/*// TODO /account01 verwijderen na DEV fase*/}
          <IconButton onClick={()=> history.push(`/checkout/account01`)} aria-label="show 17 new notifications" color="inherit">
            <Badge  badgeContent={amountOfTicketsBasket} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>


        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
});
