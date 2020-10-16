import React from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from "../store/actions";

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


export const PortfolioItem = ({eventId, eventDate, eventTime, title, day, month, time, artist, location,}) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <div className="w-full flex flex-row p-2 justify-between content-center items-center">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center leading-4 m-4">
            <span className="text-lg">07</span>
            <span className={classes.month}>OCT</span>
          </div>
          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span>MON 20:00</span>
            <div className="flex flex-row "><span className="font-bold">{artist}{' - '}</span>        <span className="">{title}</span>
            </div>
            <span className="text-xs">{location}</span>
          </div>
        </div>
        <Button

          onClick={() => {
            dispatch(Actions.openModal('eventInfoModal'))
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


