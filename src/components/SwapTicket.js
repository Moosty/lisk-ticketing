import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },

}));


export const SwapTicket = withReducer("swapTicket", reducer)(({ticketAddress, type, resellerPrice, style, eventId, ticketId}) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const basket = useSelector(({blockchain}) => blockchain.basket.items);

  const thisEvent = events.find(event => event.address === eventId);
  const ticketData = thisEvent.asset.ticketData.types.find(type => type.id === ticketId);
  const [ticketInBasket, setTicketInBasket] = useState(false);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
// TODO hier kom ik niet uit

    setTicketInBasket(basket.find((b) => b.ticketAddress === ticketAddress) ? ticketInBasket === true : ticketInBasket === false);
    // console.log("deze:", ticketData, ticketId);
    // console.log("TICKETADRES:", ticketAddress);
    // console.log("basket:", basket);

  }, [events, basket]);


  return (
    <div>
      <div style={style} className="flex flex-row px-4 justify-between content-center items-center w-full ">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <div className="flex flex-row">
              <span className="font-bold">{type}{ticketData.name}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-xs">€ {resellerPrice} - </span> <span className="text-xs font-light"> {' '}(original € {ticketData.price})</span>
            </div>

          </div>
        </div>
        <div className="flex flex-row content-center items-center flex content-center align-middle">
          {ticketInBasket === true ?
            <Button
              onClick={() => {
              }}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button2}>added</Button>
            :
            <Button
              onClick={() => {
              }}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button2}>add</Button>
          }
        </div>
      </div>
      <Divider/>
    </div>
  );
});
