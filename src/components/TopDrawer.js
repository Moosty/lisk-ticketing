import React from 'react';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import * as Actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: "100%",
    color: "white",
    backgroundColor: "#1a202c",
  },
  fullList: {
    width: 'auto',

  },
});

export const TopDrawer = withReducer('ExampleDrawer', reducer)((props) => {
  const accounts = useSelector(({blockchain}) => blockchain.account.accounts);
  // TODO ACCOUMTS DYNAMISCH MAKEN
  const thisAccount = accounts.find(account => account.address === "account02" );
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
 // TODO AMOUNT aanpassen aan user portfolio, nu pakt hij alle items
  const amountOfTickets = portfolio.length;

  const classes = useStyles();
  const history = useHistory();
  console.log("history", history);

  const dispatch = useDispatch();
  const drawers = useSelector(({drawers}) => drawers);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={() => dispatch(Actions.closeAllDrawers())}
      onKeyDown={() => dispatch(Actions.closeAllDrawers())}
    >
      <div className="flex flex-col ml-4 m">
       <span className="text-white font-bold text-lg"> Lisk Ticketing</span>
        <span className="text-sm">User account:</span>
        <span className="font-bold" style={{color:"#f50057"}}>{thisAccount.asset.username}</span>
        <div className="flex flex-row mt-2">
          <div className="flex flex-row mr-4">
            <MonetizationOnIcon fontSize="small" />
            <span className="ml-2">{thisAccount.balance}</span>
          </div>
          <div className="flex flex-row">
            <ConfirmationNumberIcon fontSize="small" />
            <span className="ml-2">{amountOfTickets}</span></div>

        </div>
      </div>
      <Divider />

      {/**/}
      <List>
        {[
          // TODO sign in veranderen in sign out wanneer je bent ingelogd
          { label:"Sign in" , link: "/signup", icon: <InboxIcon /> },
          { label:"Overview" , link: "/overview", icon: <InboxIcon /> },
          { label:"My Tickets" , link: "/my-tickets", icon: <InboxIcon /> },
          { label:"My Events" , link: "/my-events/organiser01", icon: <InboxIcon /> },
          { label:"Shopping Basket" , link: "/checkout", icon: <InboxIcon /> },

        ].map((item) => (
          <ListItem button onClick={() => history.push(`${item.link}`)} key={item.label} >
            <ListItemIcon style={{color:"#f50057"}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />


      {/*<List>*/}
      {/*  {[*/}
      {/*    { label:"Organiser" , link: "/organiser/organiser01", icon: <InboxIcon /> },*/}
      {/*    { label:"Event" , link: "/events/event01", icon: <InboxIcon /> },*/}

      {/*  ].map((item) => (*/}
      {/*    <ListItem button onClick={ () => history.push(`${item.link}`)} key={item.label}>*/}
      {/*      <ListItemIcon>{item.icon}</ListItemIcon>*/}
      {/*      <ListItemText primary={item.label} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(Actions.openDrawer(anchor))}
            >
              <MenuIcon />
            </IconButton>
            <Drawer  anchor={anchor} open={drawers[anchor].open} onClose={() => dispatch(Actions.closeDrawer(anchor))}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        )
      )}
    </div>
  );
});
