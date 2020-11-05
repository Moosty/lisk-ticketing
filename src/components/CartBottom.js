import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';
import * as Actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color:"#f50057",
  },

}));

export const CartBottom = ({props}) => {
  const {address} = useParams();
  const basket = useSelector(({blockchain}) => blockchain.basket.items);
  const events = useSelector(({blockchain}) => blockchain.event.events);
  // const thisEvent = events.find((event) => event.address === address);
  // const [thisBasket, setThisBasket] = useState();

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState();


  useEffect( () => {
      // console.log(JSON.stringify(totalPrice));
    }, [totalPrice]
  );

  useEffect( () => {
    console.log("address in params", address);
    console.log("basket", basket);

    }, [events, basket]
  );

  useEffect( () => {
      console.log("events", events);
    // PER ITEM IN DE BASKET
    // ZOEKEN WE HET MATCHENDE EVENT
    // KIJKEN WE NAAR DE MATCHENDE TICKETTYPE
    // VINDEN WE DE PRIJS VAN HET TICKET
    // * MAAL HET AANTAL (QUANTITY) IN HET BASKET ITEM
    // EN AL DIE BASKET.ITEMS * PRIJS TELLEN WE OP MET REDUCE
    const basketItemPrice = basket.map(b => events.find(e => e.address === b.eventId).asset.ticketData.types.find(t => t.id === b.ticketType).price * b.quantity);
    console.log(basketItemPrice);
    setTotalPrice(basketItemPrice.reduce((a, b) => a + b));
    console.log(totalPrice);
    }, [events, basket, totalPrice]
  );

  return (
    <div className="bottom-0 fixed z-50 bg-gray-900 text-white w-full ">
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span className="text-lg mb-2">Total Amount:</span>
            <span className="font-bold">€ {totalPrice}</span>

          </div>
        </div>

        <div className="flex flex-row content-center items-center">
          <Button
            onClick={() => {
              history.push(`/checkout/account01`);
              // console.log(basket);
            } }

            variant="contained"
            size="small"
            color="secondary"
            className={classes.button2}>Checkout</Button>


        </div>
      </div>
      <Divider />
    </div>
  );
};
