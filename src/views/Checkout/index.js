import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import Button from "@material-ui/core/Button";
import {useHistory, useParams} from "react-router-dom";
import {MyTicket} from "components/MyTicket";
import * as Actions from "../../store/actions";


// TODO animatie toevoegen: bij openen van deze pagina van beneden naar boven sliden
// TODO op de voorgrond zetten.

export const Checkout = withReducer("checkout", reducer)((props) => {
  const { ownerId } = useParams();
  const basket = useSelector(({blockchain}) => blockchain.basket.items);
  const thisBasket = basket.filter(basket => basket.ownerId === ownerId );

  const [totalPrice, setTotalPrice] = useState();
 const amountOfTickets = thisBasket.length;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
      console.log("basket", basket);
      console.log("basket length", basket.length);
      setTotalPrice(basket.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      ));
    }, [basket]
  );

  return (<div className="mt-10">

    <div className="pt-10 bg-gray-900  w-full h-screen text-white">

      <div className=" py-5 md:p-12 lg:p-24  h-full flex flex-col ">
        <h1 className="mx-10 text-4xl leading-10 sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">Checkout</h1>
        <div className="p-6 pr-2">
      {thisBasket && thisBasket.map(item => {
        console.log("this", basket);

        return (<MyTicket
          size="large"
          eventId={item.eventId}
          checkout="true"
          key={item.basketId}
          keyEvent={item.eventId}
          ticketType={item.ticketType}
        />
        )
      })}
        </div>
      <div className="w-full fixed z-50 p-4 bottom-0 flex flex-row bg-gray-900 justify-between">
        <div className="flex-col mx-4 ">
          <div className="leading-4">

        <span className="text-xs">Je hebt {amountOfTickets} tickets in je winkelmand</span>
          </div>
          <div className="">

            <span className="font-bold">Total Costs </span>
            <span className="font-bold">€ {totalPrice}</span>
          </div>
        </div>




      <Button

        onClick={()=> { dispatch(Actions.openModal('confirmTxModal', null))}}

        variant="contained"
        size="small"
        color="secondary"
        className="m-20"
      >Buy Tickets</Button>
      </div>
      </div>

    </div>
  </div>)
});
