import React, {useEffect} from "react";
import {TicketListItem, TicketType} from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// TODO - OVERVIEW PAGINA: alle events
// TODO - organisatie pagina: gefilterd

export const TicketList = withReducer("TicketList", reducer)((props) => {
  const { address } = useParams();
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const theseEvents = events.filter(event => event.asset.eventData.ownerId === address);

  useEffect(() => {
    console.log("meegegeven prop");
    console.log("alle events in ticketlist:", events);
    console.log("deze events", theseEvents);
  }, [events])

  return <div>

    {theseEvents && theseEvents.map(event => {
      return (
      <TicketListItem key={event.address}
                      eventId={event.address}
                      eventDate={event.asset.eventData.eventDate}
                      startEvent={event.asset.eventData.eventTime}
                      artist={event.asset?.eventData?.artist}
                      title={event.asset?.eventData?.title}
                      location={event.asset?.eventData?.location}
      /> )
    })}

    <h1 className="text-xl ml-5 leading-10 sm:text-3xl sm:text-center lg:text-5xl text-black font-extrabold">All Events</h1>


    {events && events.map(event => {
      return (
        <TicketListItem key={event.address}
                        eventId={event.address}
                        eventDate={event.asset.eventData.eventDate}
                        startEvent={event.asset.eventData.eventTime}
                        artist={event.asset?.eventData?.artist}
                        title={event.asset?.eventData?.title}
                        location={event.asset?.eventData?.location}
        /> )
    })}


  </div>;
});
