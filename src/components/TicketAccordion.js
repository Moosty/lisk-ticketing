import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SwapTicket } from "components/SwapTicket";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Actions from "../store/actions";
import { useEvent, useMarket } from "utils/hooks";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const {event} = useEvent(address);
  const {marketSelected} = useMarket(event);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><span className="font-bold">{marketSelected?.length}</span> Swap
            Tickets available</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            <div
              className="w-full mb-2 font-bold cursor-pointer"
              onClick={() => dispatch(Actions.openModal('swapTicketInfo'))}>
              What are swaptickets?
            </div>
            <div className="w-full mb-20">
              {marketSelected?.map((type) => {
                return <SwapTicket
                  key={type.id}
                  ticketId={type.id}
                  typeId={type.typeId}
                  eventId={type.eventId}
                  marketId={type.market}
                  style={{width: "full"}}/>

              })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
});
