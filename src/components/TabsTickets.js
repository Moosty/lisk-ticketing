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

function TabPanel(props) {
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

TabPanel.propTypes = {
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
  // WE ZOEKEN DE JUISTE PORTFOLIO ITEMS BIJ DIT ACCOUNT
  const {account} = useParams();
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisPortfolio = portfolio.filter((portfolio) => portfolio.ownerId === account);
  const tickets_OWNED = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "OWNED");
  const tickets_SELLING = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "SELLING");
  const tickets_PAST_EVENTS = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "PAST_EVENT");


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
          <Tab label="my tickets" {...a11yProps(0)} />
          <Tab label="Old tickets" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>selling</div>
          {tickets_SELLING && tickets_SELLING.map(item => {
            console.log("DIT PORTFOLIO", thisPortfolio);
            console.log("STATUSES OWNED", tickets_OWNED);

            return (<PortfolioItem
              type="sell"
              key={item.ticketAddress}
              keyEvent={item.eventId}
              ticketType={item.ticketType}
            />)
          })}

          <div>owned</div>

          {tickets_OWNED && tickets_OWNED.map(item => {
            console.log("DIT PORTFOLIO", thisPortfolio);
            console.log("STATUSES OWNED", tickets_OWNED);

            return (<PortfolioItem
              type="sell"
              key={item.ticketAddress}
              keyEvent={item.eventId}
              ticketType={item.ticketType}
            />)
          })}

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {tickets_PAST_EVENTS && tickets_PAST_EVENTS.map(item => {
            console.log("DIT PORTFOLIO", thisPortfolio);
            console.log("TICKETS PAST EVENTS", tickets_PAST_EVENTS);

            return (<PortfolioItem
              type="sell"
              key={item.ticketAddress}
              keyEvent={item.eventId}
              ticketType={item.ticketType}
            />)
          })}
        </TabPanel>

      </SwipeableViews>
    </div>
  );
});