import React, {useEffect, useState} from "react";
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

export const MyTickets = withReducer("mytickets", reducer)((props) => {
const { address } = useParams();
const organiser = useSelector(({blockchain}) => blockchain.organiser.organiserAccounts.address === address);

useEffect( () => {
  console.log("organiserId params", address);
  console.log("organiser", organiser);
  }, organiser,

);

return <div className="mt-10">

    {props.type === 'user' && <div>
      <Header
        title="My Tickets"
        subtitle="keep all your tickets safe"
      />
      <TabsTickets type="user"/>
    </div>}

    {props.type === 'organiser' && <div>
      <Header
        title="My Events"
        subtitle="keep all your tickets safe"
      />
      <TabsTickets type="organiser" />

    </div>}

  </div>;
});

