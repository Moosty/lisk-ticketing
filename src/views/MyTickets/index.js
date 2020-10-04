import React from "react";
import {Header} from "components/Header";

export const MyTickets = (props) => {
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
  </div>;
};
