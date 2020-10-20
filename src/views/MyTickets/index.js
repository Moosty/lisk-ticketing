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


  return <div className="mt-10">
    <Header
      title="My Tickets"
      subtitle="keep all your tickets safe"
   />
  <TabsTickets />

  </div>;
});

