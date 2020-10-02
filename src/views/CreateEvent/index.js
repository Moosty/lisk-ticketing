import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {OrganiserHeader} from "components/OrganiserHeader";
import { useHistory } from "react-router-dom";
import {statuses} from "../../store/reducers/blockchain/event.reducer";

// events: [
//   {
//     address: "asdffqwerkqjewrflqkwejfL",
//     publicKey: "lsk1234134tgerafgvasdfx9325fgcd",
//     asset: {
//       eventData: {
//         status: statuses.OPEN_FOR_SALE,
//         title: "title",
//         artist: "Racoon",
//         location: "Caprera Openluchttheater - Bloemendaal",
//         startEvent: new Date(),
//         endEvent: "end time event",
//         category: "test category",
//         site: "https://lisk.io/apps/",
//         image: "event image",
//       },
//       ticketData: {
//         startSell: "date start selling",
//         endSell: "standard event date",
//         types: [
//           {
//             id: 0,
//             name: "First Release Ticket",
//             price: 45.26,
//             amount: 10,
//             sold: 0,
//           },
//           {
//             id: 1,
//             name: "Second Release Ticket",
//             price: 55.26,
//             amount: 20,
//             sold: 0,
//           },
//           {
//             id: 2,
//             name: "Third Release Ticket",
//             price: 75.26,
//             amount: 20,
//             sold: 0,
//           },
//         ],
//       },
//       resellData: {
//         resell: true,
//         maximumResellPercentage: 120,


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
        <li className="mt-2">
          Event Title
        </li>
        <li>
          Locatie
        </li>
        <li>
          Artiest
        </li>
        <li>
          Starttijd
        </li>
        <li>
          Eindtijd
        </li>
        <li>
          Tickets (soort tickets)
        </li>
        <li>
          Resell opties: ja/nee && percentage resell && percentage organiser
        </li>
        <li className="mt-10">
          Status: wanneer begint verkoop?
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
