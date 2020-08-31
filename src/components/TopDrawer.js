import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
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
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={() => dispatch(Actions.openDrawer(anchor))}>{anchor}</Button>
            <Drawer anchor={anchor} open={drawers[anchor].open} onClose={() => dispatch(Actions.closeDrawer(anchor))}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        )
      )}
    </div>
  );
});
