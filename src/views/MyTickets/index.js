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
import {ticketStatuses} from "../../store/reducers/blockchain/portfolio.reducer";



export const MyTickets = withReducer("mytickets", reducer)( (props) => {

  // WE ZOEKEN DE JUISTE PORTFOLIO ITEMS BIJ DIT ACCOUNT
  const { account } = useParams();
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisPortfolio = portfolio.filter ((portfolio) => portfolio.ownerId === account);
  const status_OWNED = thisPortfolio.filter ((portfolio) => portfolio.ticketStatus === "OWNED");
  const status_SELLING = thisPortfolio.filter ((portfolio) => portfolio.ticketStatus === "SELLING");
const status_PAST_EVENTS = thisPortfolio.filter ((portfolio) => portfolio.ticketStatus === "PAST_EVENT");

  return <div className="mt-10">
    <Header
      title="My Tickets"
      subtitle="keep all your tickets safe"
   />
  <TabsTickets />

    {thisPortfolio && thisPortfolio.map(item => {
      console.log("DIT PORTFOLIO", thisPortfolio);
      console.log("STATUSES OWNED", status_PAST_EVENTS);

      return ( <PortfolioItem
        type="sell"
        key={item.ticketAddress}
        keyEvent={item.eventId}
        ticketType={item.ticketType}
      />)
    })}


  </div>;
});

