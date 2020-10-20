import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from "../store/actions";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

// DIT COMPONENT WORDT GEBRUIKT IN MY-TICKETS & DE BASKET

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


export const PortfolioItem = withReducer("portfolioItem", reducer)(({ticketType, eventId, eventDate, eventTime,type, title, day, month, time, artist, location, keyEvent}) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const thisEvent = events.find(event => event.address === keyEvent);
  const eventData = thisEvent.asset.eventData;

  const ticketData = thisEvent.asset.ticketData.types.find(type => type.id === ticketType );

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    console.log(thisEvent);
    // console.log(ticketData);
    console.log(ticketType, ticketData);
    }, [events]
  );

  return (
    <div>
      <div className="w-full flex flex-row p-2 justify-between content-center items-center">
        <div className="flex flex-row ">




          <div className="flex flex-col items-center leading-4 m-4">
            <span className="text-lg">07</span>
            <span className={classes.month}>OCT</span>
          </div>
          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span>MON 20:00</span>            <span>${ticketData.price} - {ticketData.name}</span>
            <div className="flex flex-row "><span className="font-bold">{eventData.artist}{' - '}</span>        <span className="">{eventData.title}</span>
            </div>
            <span className="text-xs">{eventData.location}</span>
          </div>
        </div>
        {type === 'sell' &&
        <Button

          onClick={() => {
            dispatch(Actions.openModal('ticketOptionsModal'))
          }}

          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button2}>Sell</Button>
        }
        {type === 'cancel' &&
        <IconButton
          onClick={() => {
            dispatch(Actions.openModal('cancelInfoModal'))
          }}
          color="secondary"
        >
          <DeleteOutlined color="white" />
        </IconButton>


        }



      </div>
      <Divider />
    </div>
  );
});


