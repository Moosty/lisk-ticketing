import React, { useEffect, useState } from 'react';
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
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import * as Actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { transactions } from "@liskhq/lisk-client";
import { useTickets } from "../utils/hooks";
import { ticketStatuses } from "../store/reducers/blockchain/portfolio.reducer";

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

export const TopDrawer = withReducer('ExampleDrawer', reducer)(() => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {myTickets} = useTickets();
  const drawers = useSelector(({drawers}) => drawers);
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const { organizers } = useSelector(({blockchain}) => blockchain.organizer)

  const [signedInAsOrganiser, setSignedInAsOrganiser] = useState(false);
  const [signedInAsUser, setSignedInAsUser] = useState(false);
  const [organization, setOrganization] = useState({});

  useEffect(() => {
    if (organizers && account?.organizer?.organization) {
      setOrganization(organizers.find(o => o.id === account.organizer.organization));
    }
  }, [account, organizers])

  useEffect(() => {
    if (account?.sprinkler?.username) {
      setSignedInAsUser(true);
      setSignedInAsOrganiser(false);
    } else if (account?.organizer?.organization) {
      setSignedInAsUser(false);
      setSignedInAsOrganiser(true);
    } else {
      setSignedInAsUser(false);
      setSignedInAsOrganiser(false);
    }
  }, [account]);

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={() => dispatch(Actions.closeAllDrawers())}
      onKeyDown={() => dispatch(Actions.closeAllDrawers())}
    >
      <div className="flex flex-col ml-4 my-4">
        <span className="text-white font-bold mb-2 text-xl">Lisk Ticketing</span>
        {account.token && <div className="flex flex-col">
          <span className="text-sm">User account:</span>
          <span className="font-bold" style={{color: "#f50057"}}>{signedInAsUser ? account?.sprinkler?.username : account?.organizer?.organization ? organization?.organization : ""}</span>
          <div className="flex flex-row mt-2">
            <div className="flex flex-row mr-4">
              <MonetizationOnIcon fontSize="small"/>
              <span
                className="ml-2">{account?.token?.balance && transactions.convertBeddowsToLSK(account?.token?.balance)}</span>
            </div>
            <div className="flex flex-row">
              <ConfirmationNumberIcon fontSize="small"/>
              <span className="ml-2">{myTickets?.filter(mt => mt.status === ticketStatuses.OWNED || mt.status === ticketStatuses.MARKET)?.length}</span></div>
          </div>
        </div>}
      </div>
      <Divider/>
      <ListItem
        style={{backgroundColor: "#E91E63"}}
        button onClick={() => {
        dispatch(Actions.signOut());
        history.push(`/login`);
      }} key={"login"}>
        <ListItemIcon style={{color: "#f50057"}}>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
        <ListItemText primary={account.token ? "Sign Out" : "Sign In"}/>
      </ListItem>
      <ListItem button onClick={() => history.push(`/overview`)}>
        <ListItemIcon style={{color: "#f50057"}}><InboxIcon/></ListItemIcon>
        <ListItemText primary={"Overview"}/>
      </ListItem>
      <List>
        {signedInAsUser && [
          {label: "My Tickets", link: "/my-tickets", icon: <InboxIcon/>},
          {label: "Shopping Cart", link: "/checkout", icon: <InboxIcon/>},
        ].map((item) => (
          <ListItem button onClick={() => history.push(`${item.link}`)} key={item.label}>
            <ListItemIcon style={{color: "#f50057"}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label}/>
          </ListItem>
        ))}
        {signedInAsOrganiser === true && [
          {label: "My Events", link: "/my-events", icon: <InboxIcon/>},
          {label: "My Account", link: "/organizer", icon: <InboxIcon/>},
        ].map((item) => (
          <ListItem button onClick={() => history.push(`${item.link}`)} key={item.label}>
            <ListItemIcon style={{color: "#f50057"}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label}/>
          </ListItem>
        ))}
      </List>
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
              <MenuIcon/>
            </IconButton>
            <Drawer anchor={anchor} open={drawers[anchor].open} onClose={() => dispatch(Actions.closeDrawer(anchor))}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        )
      )}
    </div>
  );
});
