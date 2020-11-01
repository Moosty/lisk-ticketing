import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles, withStyles  } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';
import * as Actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CropFreeTwoToneIcon from '@material-ui/icons/CropFreeTwoTone';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { statuses } from "../store/reducers/blockchain/event.reducer";

const monthNames = ["JAN", "FEB", "MRT", "APR", "MAY", "JUNE",
  "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
];

const days = ["MON", "TUE", "WED", "Thursday", "FRI", "SAT",
  "SUN"
];

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'orange',
    color: 'orange',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const colors = {
  [statuses.SOLD_OUT]: "#00E676",
  [statuses.OPEN_FOR_SALE]: "#FFEA00",
  [statuses.UPCOMING]: "#f50057"
}

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



export const EventItem = ({key, eventDetail, eventId, eventDate, eventTime, title, day, month, time, artist, location, type, status, color}) => {
const history = useHistory();

  return (
    <div className=" w-full ">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center my-3 ">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar variant="rounded"  style={{backgroundColor:colors[status]}}>
              <div className="flex flex-col center items-center">
                <span className="text-xs">{eventDate.getDate()}</span>
                <span className="text-xs">{monthNames[eventDate.getMonth()]}</span>
              </div>
            </Avatar>
          </StyledBadge>

          <div className="flex flex-col text-sm leading-4 mx-2"  style={{color:color}}>
            <div><span className="font-medium text-left block"> {title}</span>
              <span className=""></span>
            </div>
            {type === 'large' &&
            <span className="font-bold text-xs flex flex-row" style={{color:"#f50057"}}>Second Release Ticket</span>
            }
            {/*Jaarbeurs Utrecht*/}
            <span className="font-light text-xs flex flex-row">{location}</span>
          </div>
        </div>



        <div className="flex items-center flex-row">

          { type === 'overview' &&   <Button

            onClick={() => {
              console.log(eventId);
              history.push(`/events/${eventId}`);
            }}

            variant="outlined"
            color="secondary"
            size="small"
            >Details</Button> }



          { type === 'organiser' &&   <Button

            onClick={() => {
              console.log(eventId);
              history.push(`/my-events/event-details/${eventId}`);
            }}

            variant="outlined"
            color="secondary"
            size="small"
            >Details</Button> }

          { type === 'eventDetail' &&  <div className="w-full"> </div>}
        </div>



      </div>


      <Divider />
    </div>
  );
};
