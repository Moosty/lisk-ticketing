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

export const CartBottom = ({totalPrice}) => {

  const classes = useStyles();

  return (
    <div className="bottom-0 fixed z-50 bg-black text-white w-full">
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span className="text-lg mb-2">Total Amount:</span>
            <span className="font-bold">{totalPrice}</span>

          </div>
        </div>
        <div className="flex flex-row content-center items-center">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button2}>Order</Button>


        </div>
      </div>
      <Divider />
    </div>
  );
};
