import React, { useEffect, useState } from "react";
import { EventHeader, TopBar } from "components/index";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import { useParams } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import { EventBottom } from "components/EventBottom";
import { useEvent } from "utils/hooks/event";
import { useMarket, useOrganizer } from "../../utils/hooks";

export const OrganiserEventDetails = withReducer("organiserEventDetails", reducer)(() => {
  const organizer = useOrganizer(true, '/login');
  const {id} = useParams();
  const {event} = useEvent(id);
  const {marketSelected} = useMarket(event);
  const [ticketsAmount, setTicketsAmount] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);

  useEffect(() => {
    if (event) {
      setTicketsAmount(event.ticketData.reduce(
        (sum, item) => sum + (item.amount), 0
      ));
      setTicketsSold(event.ticketData.reduce(
        (sum, item) => sum + (item.sold), 0
      ));
    }
  }, [event]);

  return <div>
    <TopBar/>
    {event && <EventHeader
      key={`event-${event.id}`}
      eventId={event.id}
      artist={event.eventData.artist}
      location={event.eventData.location}
      eventTimestamp={event.eventData.date}
      organiser={event.eventData.ownerId}
      title={event.eventData.title}
      status={event.eventData.status}
      type="organiser"
      className="mt-10"
    />}
    <div className="flex flex-col w-full p-6  ">
      <div className="flex flex-row mb-4 justify-between  ">
        <Card className="w-40   rounded border-gray-300 ">
          <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Tickets</div>
          <Divider/>
          <div className="flex flex-row">
            <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">
              <span className="font-medium text-xs text-center uppercase">Total</span>
              <span className="font-bold text-indigo-900">{ticketsAmount}</span>
            </div>
            <div
              className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
              <span className="font-medium text-xs text-center uppercase">Sold</span>
              <Divider/>
              <span className="font-bold text-indigo-900">{ticketsSold}</span>
            </div>
          </div>
        </Card>
        <Card className="w-40   rounded border-gray-300 ">
          <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Swap Tickets</div>
          <Divider/>
          <div className="flex flex-row">
            <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">
              <span className="font-medium text-xs text-center uppercase">available</span>
              <span className="font-bold text-indigo-900">{marketSelected?.length > 0 ? marketSelected.length : 0}</span>
            </div>
          </div>
        </Card>
      </div>
      <Card className="w-full   rounded border-gray-300 mb-4">
        <div className="text-center font-medium text-sm p-2 bg-green-400 text-white">Total Earned</div>
        <Divider/>
        <div className="flex ">
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">
            <span className="font-medium text-xs text-center uppercase">Original tickets</span>
            <span className="font-bold text-indigo-900">€ 45.000</span>
          </div>
        </div>
      </Card>
      <Card className="w-full   rounded border-gray-300 ">
        <div className="text-center font-medium text-sm p-2 bg-indigo-900 text-white">Total Scanned Tickets</div>
        <Divider/>
        <div className="flex ">
          <div className="flex flex-col align-middle text-center align-middle items-center py-4 w-3/6">
            <span className="font-medium text-xs text-center uppercase">Scanned</span>
            <span className="font-bold text-indigo-900"> 5.000</span>
          </div>
          <div
            className="flex flex-col align-middle text-center align-middle items-center py-4 border-l-2 border-gray-300 w-3/6">
            <span className="font-medium text-xs text-center uppercase">left</span>
            <Divider/>
            <span className="font-bold text-indigo-900"> 45</span>
          </div>
        </div>
      </Card>
    </div>
    <EventBottom/>
  </div>;
});
