import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "store/actions";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useOrganizer } from "../utils/hooks";
import { transactions } from "@liskhq/lisk-client";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },

}));

export const TicketType = withReducer("TicketType", reducer)(({label, price, style, amount, eventId, key, ticketType, sold}) => {
  const dispatch = useDispatch();
  const {isOrganizer} = useOrganizer();
  const basketItems = useSelector(({blockchain}) => blockchain.basket.items);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (basketItems.find(i => i.eventId === eventId && i.ticketType === ticketType)) {
      setItem(basketItems.find(i => i.eventId === eventId && i.ticketType === ticketType));
    }
  }, [basketItems, item]);

  return (
    <div style={style} className="flex flex-row px-4 justify-between content-center items-center ">
      <div className="flex flex-row ">
        <div className="flex flex-col text-sm float-left leading-4 my-2">
          <div className="flex flex-row">
            <span className="font-bold">{label}</span> <span className="ml-1 font-light ">({
              item?.quantity ? amount - sold - item?.quantity === 0 ? 'Sold out' : amount - sold - item?.quantity : amount - sold === 0 ? 'Sold out' : amount - sold
          })</span>
          </div>
          <span className="text-xs">€ {transactions.convertBeddowsToLSK(price.toString())}</span>
        </div>
      </div>
      {!isOrganizer && <div className="flex flex-row content-center items-center flex content-center align-middle">
          <span
            className="text-3xl font-bold align-middle content-center cursor-pointer"
            onClick={() => dispatch(Actions.removeItem(eventId, ticketType))}>-</span>
        <div className=" mx-2 border-2 rounded h-8 w-8 center  flex content-center">
          <span className="justify-center m-auto items-baseline content-center">{item?.quantity ? item.quantity : 0}</span>
        </div>
        <span
          className="text-3xl font-bold cursor-pointer"
          onClick={() => {
            if ((item?.quantity && amount - sold - item?.quantity > 0) || (!item?.quantity && amount - sold > 0)) {
              dispatch(Actions.addItem(eventId, ticketType))
            }
          }}>+</span>
      </div>}
    </div>);
});
