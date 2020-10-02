import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {OrganiserHeader} from "components/OrganiserHeader";
import { useHistory } from "react-router-dom";

export const CreateEvent = (props) => {
  const history = useHistory();

  return <div className="mt-10">
    <OrganiserHeader
      name="Create Event"
      balance ="location"
      button1 ="Create new event" />

    <div>
      <ul>
        <li>
          header aanpassen
        </li>
        <li>
          input velden toevoegen
        </li>
      </ul>
    </div>

    <div className="bottom-0 fixed z-50 bg-black text-white w-full ">
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span className="text-lg mb-2">Event</span>
            <span className="font-bold">...</span>

          </div>
        </div>

        <div className="flex flex-row content-center items-center">
          <Button
            onClick={() => history.push(`/organiser`)}
            variant="contained"
            size="small"
            color="secondary"
            className="">Submit Event</Button>
        </div>
      </div>
      <Divider />
    </div>
  </div>;
};
