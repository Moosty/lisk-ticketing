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

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const TopDrawer = withReducer('ExampleDrawer', reducer)((props) => {
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
      {/**/}
      <List>
        {[
          { label:"Overview" , link: "/overview", icon: <InboxIcon /> },
          { label:"My Tickets" , link: "/my-tickets", icon: <InboxIcon /> },
          { label:"Shopping Basket" , link: "/checkout", icon: <InboxIcon /> },
        ].map((item) => (
          <ListItem button onClick={() => history.push(`${item.link}`)} key={item.label} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { label:"Organiser" , link: "/organiser", icon: <InboxIcon /> },
          { label:"Event" , link: "/event", icon: <InboxIcon /> },

        ].map((item) => (
          <ListItem button onClick={ () => history.push(`${item.link}`)} key={item.label}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
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
              <MenuIcon />
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
