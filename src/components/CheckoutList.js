import React from "react";
import {CheckoutItem} from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";

export const CheckoutList = withReducer("CheckoutList", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);

  return <div>

    {events && events.map(event => <CheckoutItem key={event.address}
                                                   startEvent={event.asset.eventData.startEvent}
                                                   artist={event.asset.eventData.artist}
                                                   title={event.asset.eventData.title}
                                                   location={event.asset.eventData.location}
    />)}

    {/*<TicketListItem*/}
    {/*  artist="Racoon"*/}
    {/*  location="Caprera Openluchttheater - Bloemendaal"*/}
    {/*  time="Za 19:30"*/}
    {/*  day="18"*/}
    {/*  month="apr"/>*/}
    {/*<TicketListItem*/}
    {/*  artist="TrafficLight"*/}
    {/*  location="Metropool - Hengelo OV"*/}
    {/*  time="Za 19:30"*/}
    {/*  day="18"*/}
    {/*  month="apr"/><TicketListItem*/}
    {/*artist="Racoon"*/}
    {/*location="Caprera Openluchttheater - Bloemendaal"*/}
    {/*time="za 18.00"*/}
    {/*day="24"*/}
    {/*month="jul"/>*/}
    {/*<TicketListItem*/}
    {/*  artist="Indian Askin"*/}
    {/*  location="Melkweg - Amsterdam"*/}
    {/*  time="za 20.00"*/}
    {/*  day="02"*/}
    {/*  month="jan"/>*/}

  </div>;
});
