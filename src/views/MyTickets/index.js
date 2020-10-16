import React, {useState} from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/TicketListItem";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";
import {statuses} from "../../store/reducers/blockchain/event.reducer";



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

        <PortfolioItem
           artist="Racoon"
           title="Een avond gezelligheid"
           location="Tivoli Vredenburg"
        />

  </div>;
});

