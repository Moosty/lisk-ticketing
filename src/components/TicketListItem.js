import React from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
  fontWeight: "bold",
    color:"#f50057",
  },

}));

export const TicketListItem = ({startEvent, day, month, time, artist, location,}) => {

  const classes = useStyles();

  return (
    <div>
    <div className="w-full flex flex-row p-2 justify-between content-center items-center">
     <div className="flex flex-row ">
      <div className="flex flex-col items-center leading-4 m-4">
       <span className="text-lg">{startEvent.getDate()}</span>
        {/*TODO de eerste drie letters van de maand*/}
       <span className={classes.month}>{startEvent.getMonth()}</span>
     </div>
      <div className="flex flex-col text-sm float-left leading-4 my-2">
        {/*TODO Dag van de week & tijd: leading zero */}
        <span>{startEvent.getDay()}{' '} {startEvent.getHours()}:{startEvent.getMinutes()}</span>
        <span className="font-bold">{artist}</span>
        <span className="text-xs">{location}</span>
      </div>
     </div>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button2}>Details</Button>
    </div>
      <Divider />
    </div>
  );
};
