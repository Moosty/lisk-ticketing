import React from 'react';
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Divider from "@material-ui/core/Divider";
import {EventItem} from "components/EventItem";


  const useStyles = makeStyles((theme) => ({
    button1: {
      backgroundColor: "yellow",
    },
    month: {
      fontWeight: "bold",
      color:"#f50057",
    },
    organiser: {
      fontWeight: "bold",
      color:"#f50057",
      borderStyle: "solid",
      border: "1px",
      padding: "2px",
      borderRadius: "5px",
    },

  }));

const monthNames = ["JAN", "FEB", "MRT", "APR", "MAY", "JUNE",
  "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
];


const days = ["MON", "TUE", "WED", "Thursday", "FRI", "SAT",
  "SUN"
];

export const EventHeader = ({ eventId, artist, location, title, eventDate, organiser, eventTime, type, status}) => {

  const classes = useStyles();

  return (
    <div>
      <div className="bg-fixed sm:bg-scroll bg-contain"
           style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "15vh"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>

      </div>
      </div>
      <div className="bg-gray-900" >
      <div className=" mx-6 flex flex-row" >
        {/*EVENT VIEW*/}
        { type === 'event' &&
        <h1 className="text-4xl font-black text-white">
          {artist}
        </h1>
        }

        {/*ORGANISER VIEW*/}
        { type === 'organiser' &&
        <EventItem
          key={eventId}
          eventId={eventId}
          eventDate={eventDate}
          startEvent={eventTime}
          artist={artist}
          title={title}
          location={location}
          type="eventDetail"
          status={status}
          color="white"
        />
        }


      </div>

        { type === 'event' &&

        <div className="w-full flex flex-row p-2 justify-between content-center items-center text-white">
          <div className="flex flex-row ">
            <div className="flex flex-col items-center leading-4 m-4 content-center items-center">
              {/*TODO leading zero */}
              <span className="text-lg">{eventDate.getDay()}</span>
              {/*TODO eerste drie letters van de maand */}
              <span className={classes.month}>{monthNames[eventDate.getMonth()]}</span>
            </div>
            <div className="flex flex-col text-sm float-left leading-4 my-2">
              {/*TODO Dag van de week & tijd: leading zero */}
              <span>{days[eventDate.getDay()]}{' '} {eventDate.getHours()}:{eventDate.getMinutes()}</span>
              <span className="text-xs">{location}</span>
            </div>
          </div>
        </div>}
        <Divider />

    </div>

</div>

   );
};
