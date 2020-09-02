import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {SwapTicket} from "components/SwapTicket";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const TicketAccordion = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><span className="font-bold">52</span> Swap Tickets available</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full">
          <SwapTicket
          price="€ 52.36 / € 55.50"
          type="First Release Ticket"
          style={{width:"full"}}/>
            <SwapTicket
              price="€ 42.36 / € 52.36"
              type="Second Release Ticket"
              style={{width:"full"}}/>
            <SwapTicket
              price="€ 12.36 / € 14.36"
              type="Last Release Ticket"
              style={{width:"full"}}/>

          </div>

        </AccordionDetails>
      </Accordion>

    </div>
  );
}
