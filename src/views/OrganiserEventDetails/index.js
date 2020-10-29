import React, {useEffect} from "react";
import {TicketAccordion, Event, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {EventBottom} from "components/EventBottom";

export const OrganiserEventDetails = withReducer("organiserEventDetails", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);

  const {address} = useParams();
  const thisEvent = events.find(event => event.address === address);
  const swapTicketsX = swapTickets.filter(event => event.eventId === address);

  useEffect(() => {
console.log("this event", thisEvent);
  }, [events, swapTickets]);

  return <div className="mt-10">

    <EventHeader
      key={thisEvent.address}
      eventId={thisEvent.address}
      artist={thisEvent.asset.eventData.artist}
      location={thisEvent.asset.eventData.location}
      eventDate={thisEvent.asset.eventData.eventDate}
      startEvent={thisEvent.asset.eventData.eventTime}
      organiser={thisEvent.asset.eventData.ownerId}
      title={thisEvent.asset.eventData.title}
      status={thisEvent.asset.eventData.status}
      type="organiser"
    />
    <div className="flex flex-col w-full p-6  ">


      <div className="flex flex-row mb-4 justify-between  ">
      <Card className="w-40   rounded border-gray-300 ">
       <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Tickets</div>
        <Divider />
        <div className="flex flex-row">
        <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">

          <span className="font-medium text-xs text-center uppercase">Total</span>
          <span className="font-bold text-indigo-900"> 23.000</span>

        </div>
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
            <span className="font-medium text-xs text-center uppercase">Sold</span>
            <Divider />


            <span className="font-bold text-indigo-900"> 15.000</span>

          </div>
        </div>
      </Card>
        <Card className="w-40   rounded border-gray-300 ">
          <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Swap Tickets</div>
          <Divider />
          <div className="flex flex-row">
            <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">

              <span className="font-medium text-xs text-center uppercase">available</span>
              <span className="font-bold text-indigo-900"> 26</span>

            </div>
            <div className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
              <span className="font-medium text-xs text-center uppercase">Sold</span>
              <Divider />


              <span className="font-bold text-indigo-900"> 5</span>

            </div>
          </div>
        </Card>

      </div>
      <Card className="w-full   rounded border-gray-300 mb-4">
        <div className="text-center font-medium text-sm p-2 bg-green-400 text-white">Total Earned</div>
        <Divider />
        <div className="flex ">
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">

            <span className="font-medium text-xs text-center uppercase">Original tickets</span>
            <span className="font-bold text-indigo-900">€ 45.000</span>

          </div>
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
            <span className="font-medium text-xs text-center uppercase">Swap Tickets</span>
            <Divider />


            <span className="font-bold text-indigo-900">€ 2.326</span>

          </div>
        </div>
      </Card>
      <Card className="w-full   rounded border-gray-300 ">
        <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Scanned Tickets</div>
        <Divider />
        <div className="flex ">
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">

            <span className="font-medium text-xs text-center uppercase">Scanned</span>
            <span className="font-bold text-indigo-900"> 5.000</span>

          </div>
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
            <span className="font-medium text-xs text-center uppercase">left</span>
            <Divider />


            <span className="font-bold text-indigo-900"> 45</span>

          </div>
        </div>
      </Card>


    </div>


    <EventBottom
      />
  </div>;
});
