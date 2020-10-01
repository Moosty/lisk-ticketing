import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from "store/actions";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },

}));

export const TicketType = withReducer("TicketType", reducer)(({label, price, style, amount, eventId, key, ticketType}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const items = useSelector(({blockchain}) => blockchain.basket.items);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items.find(i => i.eventId === eventId && i.ticketType === ticketType)) {
      setItem(items.find(i => i.eventId === eventId && i.ticketType === ticketType));
    }
  }, [items]);

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div>
      <div style={style} className="flex flex-row px-4 justify-between content-center items-center ">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <div className="flex flex-row">
              <span className="font-bold">{label}</span> <span className="ml-1 font-light ">({amount})</span>
            </div>
            <span className="text-xs">€ {price}</span>
          </div>
        </div>
        <div className="flex flex-row content-center items-center flex content-center align-middle">
          <span className="text-3xl font-bold align-middle content-center" onClick={handleMinus}>-</span>
          <div className=" mx-2 border-2 rounded h-8 w-8 center  flex content-center">
            <span
              className="justify-center m-auto items-baseline content-center">{item && item.quantity}</span>
          </div>
          <span className="text-3xl font-bold" onClick={() => dispatch(Actions.addItem(eventId, ticketType))}>+</span>


        </div>

      </div>
      <Divider/>
    </div>
  );
});
