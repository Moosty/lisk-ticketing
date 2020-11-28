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
import MoreVertIcon from "@material-ui/icons/MoreVert";

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


  // DIT COMPONENT WORDT VEVANGEN DOOR MyTicket.js



  // WE ZOEKEN DE EVENTDATA BIJ DE JUISTE TICKET
  const Events = useSelector(({blockchain}) => blockchain.event.events);
  const thisEvent = Events.find(event => event.address === keyEvent);
  const thisEventData = thisEvent.asset.eventData;

  // WE ZOEKEN HET JUISTE TICKET TYPE VOOR DE GEGEVENS
  const ticketData = thisEvent.asset.ticketData.types.find(type => type.id === ticketType );


  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {

    }, [thisEvent]
  );

  return (
    <div
      >
      <div className="w-full flex flex-row p-2 justify-between content-center items-center">
        <div
          onClick={() => {
            dispatch(Actions.openModal('scanTicketModal'))
          }}
          className="flex flex-row "  >




          <div

            className="flex flex-col items-center leading-4 m-4">
            <span className="text-lg">{thisEventData.eventDate.getDate()}</span>
            <span className={classes.month}>{monthNames[thisEventData.eventDate.getMonth()]}</span>
          </div
           >
          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span>{days[thisEventData.eventDate.getDay()]} {thisEventData.eventTime}</span>            <span>${ticketData.price} - {ticketData.name}</span>
            <div className="flex flex-row "><span className="font-bold">{thisEventData.artist}{' - '}</span>        <span className="">{thisEventData.title}</span>
            </div>
            <span className="text-xs">{thisEventData.location}</span>
          </div>
        </div>
        {type === 'sell' &&
        <IconButton

          onClick={() => {
            dispatch(Actions.openModal('optionsModal'))
          }}

          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button2}>
          <MoreVertIcon />
        </IconButton>
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


