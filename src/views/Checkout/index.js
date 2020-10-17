import React, {useEffect, useState} from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import Button from "@material-ui/core/Button";
import * as Actions from "../../store/actions";
import {useHistory} from "react-router-dom";
import {PortfolioItem} from "components/PortfolioItem";


// TODO animatie toevoegen: bij openen van deze pagina van beneden naar boven sliden
// TODO op de voorgrond zetten.

export const Checkout = withReducer("checkout", reducer)((props) => {
  const basket = useSelector(({blockchain}) => blockchain.basket.items);
  const [totalPrice, setTotalPrice] = useState();
 const amountOfTickets = basket.length;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
      console.log(basket);
      console.log(basket.length);
      setTotalPrice(basket.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      ));
    }, [basket]
  );

  return (<div className="mt-10">

    <div className="pt-10 bg-black w-full h-screen text-white">
      <div className=" py-10 md:p-12 lg:p-24  h-full flex flex-col justify-between">
        <h1 className="mx-10 text-4xl leading-10 sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">Checkout</h1>

      {basket && basket.map(item => {
        console.log(basket);

        return (<PortfolioItem
          type="sell"
          key={item.basketId}
          keyEvent={item.eventId}
          ticketType={item.ticketType}
        />)
      })}

      <div className="mx-10 flex flex-col">

        <span className="text-xs">Samenvatting van de tickets</span>
        <span className="text-xs">Je hebt {amountOfTickets} tickets in je winkelmand</span>
      </div>

        <div className="mx-10">

        <span className="font-bold">Totale kosten</span>
      <span className="font-bold">€ {totalPrice}</span>
      </div>

      <Button
        onClick={() => {
          console.log(basket);
          history.push('/my-tickets');
          dispatch(Actions.checkoutBasket(basket));
        }}
        variant="contained"
        size="small"
        color="secondary"
        className="m-20"
      >Buy Tickets</Button>

      </div>

    </div>
  </div>)
});
