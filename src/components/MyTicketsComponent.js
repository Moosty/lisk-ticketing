import React from "react";
import { useParams } from 'react-router-dom';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useSelector } from "react-redux";
import { PortfolioItem } from "components/PortfolioItem";
import { MyTicket } from "components/MyTicket";

export const MyTicketsComponent = withReducer("myTicketsComponent", reducer)((props) => {
  // WE ZOEKEN DE JUISTE PORTFOLIO ITEMS BIJ DIT ACCOUNT
  const {account} = useParams();
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisPortfolio = portfolio.filter((portfolio) => portfolio.ownerId === account);
  const tickets_OWNED = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "OWNED");
  const tickets_SELLING = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "SELLING");
  const tickets_PAST_EVENTS = thisPortfolio.filter((portfolio) => portfolio.ticketStatus === "PAST_EVENT");

  return (
    <div>
      {/*// ALL MY TICKETS*/}
      {props.type === 'current' && <div>
        <div>selling</div>
        {thisPortfolio && thisPortfolio.map(item => {
          return (<MyTicket
            type="sell"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
            status="active"
            size="small"
          />)
        })}
      </div>}

      {/*// CURRENT TICKETS*/}
      {props.type === 'current' && <div>
        <div>selling</div>
        {tickets_SELLING && tickets_SELLING.map(item => {
          return (<MyTicket
            type="sell"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
            status="active"
            size="small"
          />)
        })}
      </div>}

      {/*// CURRENT TICKETS*/}
      {props.type === 'current' && <div>
        <div>selling</div>
        {tickets_SELLING && tickets_SELLING.map(item => {
          return (<PortfolioItem
            type="sell"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
          />)
        })}

        <div>owned</div>

        {tickets_OWNED && tickets_OWNED.map(item => {
          return (<MyTicket
            type="owned"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
            status="active"
            size="small"
          />)
        })}

        {tickets_OWNED && tickets_OWNED.map(item => {
          return (<PortfolioItem
            type="sell"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
          />)
        })}

      </div>}

      {/*// OLD TICKETS*/}
      {props.type === 'past' && <div>
        <div>past</div>
        {tickets_PAST_EVENTS && tickets_PAST_EVENTS.map(item => {
          return (<PortfolioItem
            type="sell"
            key={item.ticketAddress}
            keyEvent={item.eventId}
            ticketType={item.ticketType}
          />)
        })}
      </div>}
    </div>
  )
});
