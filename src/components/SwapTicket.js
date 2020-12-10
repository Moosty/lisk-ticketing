import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useBasket, useEvent, useMarket } from "../utils/hooks";
import { transactions } from "@liskhq/lisk-client";
import * as Actions from 'store/actions';

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },

}));


export const SwapTicket = withReducer("swapTicket", reducer)(({marketId, style, eventId, typeId, ticketId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {event} = useEvent(eventId);
  const {marketSelected} = useMarket(event);
  const { items } = useBasket();
  const [swapTicket, setSwapTicket] = useState(null);
  const [ticketInBasket, setTicketInBasket] = useState(false);

  useEffect(() => {
    setSwapTicket(marketSelected.find(ms => ms.market === marketId));
  }, [marketId, marketSelected])

  useEffect(() => {
    setTicketInBasket(!!items.find((b) => b.id === marketId && b.quantity > 0));
  }, [items, marketId]);

  return (
      <div style={style} className="flex flex-row px-4 justify-between content-center items-center w-full ">
        <div className="flex flex-col text-sm float-left leading-4 my-2">
          <div className="flex flex-row">
            <span className="font-bold">{event?.ticketData?.find(td => td.id === typeId)?.name} {event?.name}</span>
          </div>
          <div className="flex flex-row">
            <span className="text-xs">€ {swapTicket?.value && transactions.convertBeddowsToLSK(swapTicket?.value?.toString())} - </span> <span
            className="text-xs font-light"> {' '}(original € {event?.ticketData?.find(td => td.id === typeId)?.price && transactions.convertBeddowsToLSK(event?.ticketData?.find(td => td.id === typeId)?.price?.toString())})</span>
          </div>
        </div>
        <div className="flex flex-row content-center items-center flex content-center align-middle">
          {ticketInBasket ?
            <Button
              onClick={() => dispatch(Actions.removeItem(eventId, typeId, marketId))}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button2}>added</Button>
            :
            <Button
              onClick={() => dispatch(Actions.addItem(eventId, typeId, marketId, swapTicket.value))}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button2}>add</Button>
          }
        </div>
      </div>
  );
});
