import React, { useState } from "react";
import { Header } from "components/Header";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import { TabsTickets } from "components/TabsTickets";
import { useParams } from 'react-router-dom';

export const MyTickets = withReducer("mytickets", reducer)((props) => {
  const {address} = useParams();
  const [search, setSearch] = useState("");

  return <div className="mt-10">

    {props.type === 'user' && <div>
      <Header
        search={value => setSearch(value)}
        title="My Tickets"
        subtitle="keep all your tickets safe"
      />
      <TabsTickets type="user" search={search}/>
    </div>}


  </div>;
});

