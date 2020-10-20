import React, {useState} from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/TicketListItem";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";
import {statuses} from "../../store/reducers/blockchain/event.reducer";
import {TabsTickets} from "components/TabsTickets";
import {useParams} from 'react-router-dom';



export const MyTickets = withReducer("mytickets", reducer)( (props) => {
  const { account } = useParams();
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisPortfolio = portfolio.filter ((portfolio) => portfolio.ownerId === account);

  // voor elk EventId uit het portfolio wil je eventData binnenhalen.

  return <div className="mt-10">
    <Header
      title="My Tickets"
      subtitle="keep all your tickets safe"
   />
  <TabsTickets />

    {thisPortfolio && thisPortfolio.map(item => {
      console.log(thisPortfolio);

      return ( <PortfolioItem
        type="sell"
        key={item.ticketAddress}
        keyEvent={item.eventId}
        ticketType={item.ticketType}
      />)
    })}


  </div>;
});

