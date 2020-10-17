import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {SwapTicket} from "components/SwapTicket";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const TicketAccordion = withReducer("ticketAccordion", reducer)(({ticketAddress, quantity, price, name}) => {
  const {address} = useParams();

  const classes = useStyles();
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const eventX = events.find(event => event.address === address);
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);
  const swapTicketsX = swapTickets.filter(event => event.eventId === address);

  // ik wil de naam van tickettype 1 van eventX
  // voor ticketTypeId===X wil ik eventX.asset.ticketData.types.filter(type => type.id === swapTicketsX.ticketTypeId) id=XXX
  const X = eventX.asset.ticketData.types.map(type => type.id && type.name);
  // TO DO - uit de eventreducer wil ik de ticketnamen halen.
  // we willen een key value: ticketnames = [ {0: "first release"}, {1: "second"}, ... ]

  useEffect( () => {
      console.log( "Swaptickets", swapTicketsX );

    }, [swapTickets]

  );

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
          <div className="w-full mb-20">

            {swapTicketsX.map((type) =>
              <SwapTicket
                key={type.ticketTypeId}
                resellerPrice={type.resellerPrice}
                type={type.name}
                ticketId={type.ticketTypeId}
                eventId={type.eventId}
                style={{width:"full"}}/>

            )}




          </div>

        </AccordionDetails>
      </Accordion>

    </div>
  );
});
