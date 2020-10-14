import React from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
  fontWeight: "bold",
    color:"#f50057",
  },

}));

const monthNames = ["JAN", "FEB", "MRT", "APR", "MAY", "JUNE",
  "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
];

const days = ["MON", "TUE", "WED", "Thursday", "FRI", "SAT",
  "SUN"
];


export const TicketListItem = ({eventId, eventDate, eventTime, title, day, month, time, artist, location,}) => {

  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
    <div className="w-full flex flex-row p-2 justify-between content-center items-center">
     <div className="flex flex-row ">
      <div className="flex flex-col items-center leading-4 m-4">
       <span className="text-lg">{eventDate.getDate()}</span>
        {/*TODO de eerste drie letters van de maand*/}
       <span className={classes.month}>{monthNames[eventDate.getMonth()]}</span>
     </div>
      <div className="flex flex-col text-sm float-left leading-4 my-2">
        {/*TODO Dag van de week & tijd: leading zero */}
        {/*TODO - eventTime --> koppelen */}
        <span>{days[eventDate.getDay()]}{' '} {eventDate.getHours()}:{eventDate.getMinutes()}</span>
        <div className="flex flex-row "><span className="font-bold">{artist}{' - '}</span>        <span className="">{title}</span>
        </div>
        <span className="text-xs">{location}</span>
      </div>
     </div>
        <Button

          onClick={() => {
            console.log(eventId);
            history.push(`/events/${eventId}`);
          }}

          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button2}>Details</Button>
    </div>
      <Divider />
    </div>
  );
};
