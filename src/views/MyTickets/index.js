import React, { useState } from "react";
import { Header } from "components/Header";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import { TabsTickets } from "components/TabsTickets";
import { useAccount } from "../../utils/hooks";

export const MyTickets = withReducer("mytickets", reducer)(() => {
  const [search, setSearch] = useState("");
  const {account, loggedIn} = useAccount(true, "/login")
  return <div >
      <Header
        search={value => setSearch(value)}
        title="My Tickets"
        subtitle="keep all your tickets safe"
      />
      <TabsTickets type="user" search={search}/>
  </div>;
});

