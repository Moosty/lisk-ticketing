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

export const TicketListItem = ({day, month, time, artist, location,}) => {

  const classes = useStyles();

  return (
    <div>
    <div className="w-full flex flex-row p-2 justify-between content-center items-center">
     <div className="flex flex-row ">
      <div className="flex flex-col items-center leading-4 m-4">
       <span className="text-lg">{day}</span>
       <span className={classes.month}>{month}</span>
     </div>
      <div className="flex flex-col text-sm float-left leading-4 my-2">
        <span>{time}</span>
        <span className="font-bold">{artist}</span>
        <span className="text-xs">{location}</span>
      </div>
     </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button2}>Buy</Button>
    </div>
      <Divider />
    </div>
  );
};
