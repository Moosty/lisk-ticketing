import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { MyTicketsComponent } from "components/MyTicketsComponent";
import { EventList } from "components/EventList";
import { TabContext } from '@material-ui/lab';

const a11yProps = index => ({id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
    width: "100%",
  },
}));

export const TabsTickets = withReducer("tabsTickets", reducer)(({type, search}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#1a202c", color: "white"}}>
        <Tabs
          value={value}
          style={{color: "white"}}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={type === "user" ? `my tickets` : `my events`} {...a11yProps(0)} />
          <Tab label={type === "user" ? `passed tickets` : `passed events`} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContext value="0" index={0} dir={theme.direction}>
          {type === 'user' && <MyTicketsComponent type="user" search={search} tab="ticketListTab01"/>}
          {type === 'organizer' && <EventList type="organizer" search={search} tab="eventList01"/>}
        </TabContext>
        <TabContext value="1" index={1} dir={theme.direction}>
          {type === 'user' && <MyTicketsComponent type="user" tab="ticketListTab02" search={search}/>}
          {type === 'organizer' && <EventList type="organizer" search={search} tab="eventList02"/>}
        </TabContext>
      </SwipeableViews>
    </div>
  );
});
