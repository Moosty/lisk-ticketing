import React from 'react';
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
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


export const EventHeader = ({ artist, location, startEvent}) => {

  const classes = useStyles();

  return (
    <div>
      <div className="bg-fixed sm:bg-scroll bg-contain"
           style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "20vh"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>

      </div>
      </div>
      <div className="bg-black" >
      <div className=" mx-6" >
        <h1 className="text-4xl font-black text-white">
          {artist}
        </h1>
      </div>
      <div className="w-full flex flex-row p-2 justify-between content-center items-center text-white">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center leading-4 m-4 content-center items-center">
            {/*TODO leading zero */}
            <span className="text-lg">{startEvent.getDay()}</span>
            {/*TODO eerste drie letters van de maand */}
            <span className={classes.month}>{startEvent.getMonth()}</span>
          </div>
          <div className="flex flex-col text-sm float-left leading-4 my-2">
            {/*TODO Dag van de week & tijd: leading zero */}
            <span>{startEvent.getDay()}{' '} {startEvent.getHours()}:{startEvent.getMinutes()}</span>
            <span className="text-xs">{location}</span>
          </div>
        </div>

      </div>
      <Divider />
    </div>

</div>

   );
};
