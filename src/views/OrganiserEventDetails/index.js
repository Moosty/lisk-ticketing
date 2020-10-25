import React, {useEffect} from "react";
import {Header} from "components/Header";
import {TicketAccordion, Event, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/EventList";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

export const OrganiserEventDetails = withReducer("organiserEventDetails", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);

  const {address} = useParams();
  const thisEvent = events.find(event => event.address === address);
  const swapTicketsX = swapTickets.filter(event => event.eventId === address);

  useEffect(() => {

  }, [events, swapTickets]);

  return <div className="mt-10">

    <EventHeader
      key={thisEvent.address}
      artist={thisEvent.asset.eventData.artist}
      location={thisEvent.asset.eventData.location}
      eventDate={thisEvent.asset.eventData.eventDate}
      startEvent={thisEvent.asset.eventData.eventTime}
      organiser={thisEvent.asset.eventData.ownerId}
      type="organiser"
    />



    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});