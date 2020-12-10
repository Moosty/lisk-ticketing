import React, { useState } from "react";
import { Header } from "components/Header";
import { TabsTickets } from "components/index";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useOrganizer } from "../../utils/hooks";
import { FooterComponent } from "components/FooterComponent";

export const Organizer = () => {
  const history = useHistory();
  const {organization} = useOrganizer(true, '/login');
  const [search, setSearch] = useState("");

  return <div>
    <Header
      search={value => setSearch(value)}
      title={organization}
      subtitle="My Events"
    />
    <TabsTickets type="organizer" search={search}/>
    <FooterComponent>
      <span className="text-lg m-2 text-white">{organization}</span>
      <Button
        onClick={() => history.push(`/create-event`)}
        variant="contained"
        size="small"
        color="secondary"
        className="m-2 mr-4">
        Create Event
      </Button>
    </FooterComponent>
  </div>;
};
