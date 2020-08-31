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

export const TicketType = ({type, price, style}) => {

  const classes = useStyles();

  return (
    <div>
      <div style={style} className="flex flex-row  px-4 justify-between content-center items-center ">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">

            <span className="font-bold">{type}</span>
            <span className="text-xs">{price}</span>
          </div>
        </div>
        <div className="flex flex-row content-center items-center">
          <span className="text-4xl font-bold">-</span>
          <div className="  border-2 rounded h-10 w-10 center"><span className="p-1">0</span></div>
          <span className="text-4xl font-bold">+</span>


        </div>
      </div>
      <Divider />
    </div>
  );
};
