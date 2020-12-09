import React, { useEffect, useState } from "react";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { MyTicket } from "components/MyTicket";
import { ticketStatuses } from "../store/reducers/blockchain/portfolio.reducer";
import { useEvent, useTickets } from "../utils/hooks";
import { searchByText } from "../utils";

export const MyTicketsComponent = withReducer("myTicketsComponent", reducer)(({tab, search}) => {

  const {myTickets} = useTickets();
  const [filteredTickets, setFilteredTickets] = useState();
  const { events } = useEvent();

  useEffect(() => {
    setFilteredTickets(tab ? myTickets.filter((ticket) => {
      if (search) {
        const event = events?.find(e => e.id === ticket.eventId);
        if (searchByText([event], search, ['title'])?.length === 0) {
          return false;
        }
      }
      if (tab === "ticketListTab02" && (ticket.status === ticketStatuses.PAST_EVENT || ticket.status === ticketStatuses.CANCELED || ticket.status === ticketStatuses.SCANNED)) {
        return true;
      } else if (tab === "ticketListTab01" && (ticket.status === ticketStatuses.OWNED || ticket.status === ticketStatuses.MARKET)) {
        return true;
      }
      return false;
    }) : myTickets);
  }, [myTickets, tab, search]);

  return (
    <div className="p-4 ">
      {filteredTickets?.sort((a, b) => {
        if (a.eventId.toLowerCase() < b.eventId.toLowerCase()) return -1;
        if (a.eventId.toLowerCase() > b.eventId.toLowerCase()) return 1;
        return 0;
      }).map(
        (item, i) => <MyTicket
          key={item.id}
          size="small"
          i={i}
          {...item}
        />
      )}
    </div>
  )
});
