import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";
import {MyTicketsComponent} from "components/MyTicketsComponent";
import {EventList} from "components/EventList";

function TabsContext(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabsContext.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
    width: "100%",
  },
}));

export const TabsTickets = withReducer("tabsTickets", reducer)((props) => {

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

        {props.type === 'user' &&
        <Tabs
          value={value}
          style={{color: "white"}}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="my tickets" {...a11yProps(0)} />
          <Tab label="Old tickets" {...a11yProps(1)} />
        </Tabs>}

        {props.type === 'organiser' &&
        <Tabs
          value={value}
          style={{color: "white"}}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="My Events" {...a11yProps(0)} />
          <Tab label="Old Events" {...a11yProps(1)} />
        </Tabs>}


      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/*       PANEL 1       */}
        <TabsContext value={0} index={0} dir={theme.direction}>


          {/* USER  --> MY TICKETS */}
          {props.type === 'user' &&
          <MyTicketsComponent type="current"/>
          }

          {/*ORGANISER --> MY EVENTS*/}
          {props.type === 'organiser' &&
          <EventList type="organiser"
          />          }
        </TabsContext>
        {/*       PANEL 2     */}
        <TabsContext value={1} index={1} dir={theme.direction}>

          {props.type === 'user' &&
          <MyTicketsComponent type="current"/>
          }
          {props.type === 'organiser' &&
          <EventList type="organiser"
          />          }

        </TabsContext>

      </SwipeableViews>
    </div>
  );


});