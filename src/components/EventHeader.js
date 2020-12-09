import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { EventItem } from "components/EventItem";
import moment from "moment";
import {EventAvatar} from "components/EventAvatar";
import {statuses} from "../store/reducers/blockchain/event.reducer";
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },
  organiser: {
    fontWeight: "bold",
    color: "#f50057",
    borderStyle: "solid",
    border: "1px",
    padding: "2px",
    borderRadius: "5px",
  },
}));

const colors = {
  [statuses.SOLD_OUT]: "#00E676",
  [statuses.OPEN_FOR_SALE]: "#FFEA00",
  [statuses.UPCOMING]: "#f50057",
  [statuses.CANCELLED]: "#f50057",
}

const monthNames = ["JAN", "FEB", "MRT", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const days = ["MON", "TUE", "WED", "Thursday", "FRI", "SAT", "SUN"];

export const EventHeader = ({timestamp, eventId, artist, location, title, organizer, eventTimestamp, type, status}) => {
  const classes = useStyles();
  const [date, setDate] = useState(null)

  useEffect(() => {
    setDate(moment.unix(timestamp));
  }, [timestamp]);

  return (
    <div>
      <div
        className="bg-fixed sm:bg-scroll bg-contain"
        style={{backgroundImage: "url(/images/party3.jpeg)",backgroundSize: "cover" ,height: "20vh"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}></div>
      </div>
      <div className="bg-gray-900">
        <div className=" mx-6 flex flex-row">
          {/*EVENT VIEW*/}
          {type === 'event' &&
          <h1 className="flex pt-4 flex-col text-2xl leading-8 font-bold text-white">
            {title}
            {artist}

          </h1>
          }

          {/*ORGANISER VIEW*/}
          {type === 'organiser' &&
          <EventItem
            key={eventId}
            eventId={eventId}
            eventTimestamp={eventTimestamp}
            artist={artist}
            title={title}
            location={location}
            type="eventDetail"
            status={status}
            color="white"
          />}
        </div>
        {type === 'event' &&
        <div className="w-full pb-4 flex flex-row   justify-between  items-center text-white">
          <div className="flex flex-col ">

            <div className="flex flex-col   text-left float-left my-2 ">

              <div className="flex flex-row align-middle items-center mx-6 mb-1">
                <EventIcon
                style={{marginRight:"0.5rem", fontSize:"1rem"}}/>
                <span className="text-xs center font-medium" style={{color:"#f50057"}}>{date?.format("dddd, MMMM Do YYYY")}</span>

              </div>
              <div className="flex flex-row align-middle items-center mx-6 mb-1">
                <ScheduleIcon
                    style={{marginRight:"0.5rem", fontSize:"1rem"}}/>
                <span className="text-xs font-medium " style={{color:"#f50057"}}>{date?.format("HH:mm a")}</span>
              </div>
              <div className="flex flex-row align-middle items-center mx-6 mb-1">
                <RoomIcon
                    style={{marginRight:"0.5rem", fontSize:"1rem"}}/>
                <span className="text-xs font-medium " style={{color:"#f50057"}}>{location}</span>
              </div>




            </div>

          </div>
        </div>}
      </div>
    </div>
  );
};
