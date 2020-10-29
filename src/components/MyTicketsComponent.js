import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";
import {PortfolioItem} from "components/PortfolioItem";
import {MyTicket} from "components/MyTicket";
import {statuses} from "../store/reducers/blockchain/event.reducer";
import {ticketStatuses} from "../store/reducers/blockchain/portfolio.reducer";
import {EventItem} from "components/EventItem";

export const MyTicketsComponent = withReducer("myTicketsComponent", reducer)(({tab,}) => {

  const {account} = useParams();
  // tickets binnenhalen (1)
  const ticketPortfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const [filteredTickets, setFilteredTickets] = useState();

  // (1) tickets binnenhalen
  // (2) filteren op basis van adress account
  // (3) eventueel search
  // (4) setFilter op basis van TAB

  // (5) content --> map over filter

  useEffect(() => {
      const selectedTickets = account ? ticketPortfolio.filter((portfolio) => portfolio.ownerId === account) : "you have no tickets";
      setFilteredTickets(tab ? selectedTickets.filter( (ticket) => {
          if (tab === "ticketListTab02" && ticket.ticketStatus === ticketStatuses.PAST_EVENT || ticket.ticketStatus === ticketStatuses.SOLD) {
            return true;
          } else if (tab === "ticketListTab01" && (ticket.ticketStatus === ticketStatuses.OWNED || ticket.ticketStatus === ticketStatuses.SELLING)) {
            return true;
          }
          return false;
        }
        ) : selectedTickets);
    }, [ticketPortfolio, account, tab,],
  );


  return (
    <div>
      { filteredTickets && filteredTickets.map(
        (item) =>
          <MyTicket
              key={item.ticketAddress}
              keyEvent={item.eventId}
              ticketType={item.ticketType}
              status={item.ticketStatus}
              size="small"
            />
      )}

      {/*// ALL MY TICKETS*/}
      {/*{props.type === 'current' && <div>*/}
      {/*  <div>selling</div>*/}
      {/*  {thisPortfolio && thisPortfolio.map(item => {*/}
      {/*    return (<MyTicket*/}
      {/*      type="sell"*/}
      {/*      key={item.ticketAddress}*/}
      {/*      keyEvent={item.eventId}*/}
      {/*      ticketType={item.ticketType}*/}
      {/*      status="active"*/}
      {/*      size="small"*/}
      {/*    />)*/}
      {/*  })}*/}
      {/*</div>}*/}


      {/*      */}
      {/*      <PortfolioItem*/}
      {/*      type="sell"*/}
      {/*      key={item.ticketAddress}*/}
      {/*      keyEvent={item.eventId}*/}
      {/*      ticketType={item.ticketType}*/}
      {/*    />*/}
      {/*  */}


    </div>
  )
});
