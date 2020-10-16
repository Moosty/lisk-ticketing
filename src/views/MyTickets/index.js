import React from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/TicketListItem";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";

export const MyTickets = withReducer("mytickets", reducer)( (props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.events);

  // voor elk EventId uit het portfolio wil je eventData binnenhalen.

  return <div className="mt-10">
    <Header
      title="My Tickets"
      subtitle="keep all your tickets safe"
   />
   <div>
     <ul>
       <li>Lijst Tickets</li>
       <li>Event X (dropdown)</li>
       <li>- ticketgegevens (1 of meerdere)</li>
       <li>- eventgegevens</li>
       <li>- status event</li>
       <li>- resell opties</li>
     </ul>
   </div>


    {events && events.map(event => {
      console.log(events);
      return (
        <PortfolioItem key={event.address}
                       eventId={event.address}
                       eventDate={event.asset.eventData.eventDate}
                       startEvent={event.asset.eventData.eventTime}

                       artist={event.asset?.eventData?.artist}
                       title={event.asset?.eventData?.title}
                       location={event.asset?.eventData?.location}
        />)
    })}


    {events && events.map(event => {
      console.log(events);
      return (
        <PortfolioItem key={event.address}
                       eventId={event.address}
                       eventDate={event.asset.eventData.eventDate}
                       startEvent={event.asset.eventData.eventTime}

                       artist={event.asset?.eventData?.artist}
                       title={event.asset?.eventData?.title}
                       location={event.asset?.eventData?.location}
        />)
    })}

  </div>;
});
