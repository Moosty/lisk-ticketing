import React, {useState} from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/TicketListItem";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";
import {statuses} from "../../store/reducers/blockchain/event.reducer";
import {TabsTickets} from "components/TabsTickets";



export const MyTickets = withReducer("mytickets", reducer)( (props) => {
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);

  // voor elk EventId uit het portfolio wil je eventData binnenhalen.

  return <div className="mt-10">
    <Header
      title="My Tickets"
      subtitle="keep all your tickets safe"
   />
  <TabsTickets />

    {portfolio && portfolio.map(item => {
      console.log(portfolio);

      return ( <PortfolioItem
        type="sell"
        key={item.ticketAddress}
        keyEvent={item.eventId}
        ticketType={item.ticketType}
      />)
    })}


  </div>;
});

