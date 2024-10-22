import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
import { statuses } from "../store/reducers/blockchain/event.reducer";
import { EventAvatar } from "components/EventAvatar";

const monthNames = ["JAN", "FEB", "MRT", "APR", "MAY", "JUNE",
  "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
];

const days = ["MON", "TUE", "WED", "Thursday", "FRI", "SAT",
  "SUN"
];

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'green',
    color: 'green',
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
  canceled: {
    backgroundColor: 'red',
    color: 'red',
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
  [statuses.UPCOMING]: "#f50057",
  [statuses.CANCELLED]: "#f50057",
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


export const EventItem = ({eventId, eventTimestamp, title, location, type, status, color}) => {
  const history = useHistory();
  const MAX_LENGTH = 35;
  const MAX_LENGTH_LOCATION = 40;

  return (
    <div
      className="w-full"
      onClick={() => {
        type === "organizer" ? history.push(`/event-details/${eventId}`) : history.push(`/events/${eventId}`)
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center my-3 ">
          <EventAvatar timestamp={eventTimestamp} status={status}/>

          <div className="flex flex-col text-sm leading-4 mx-2" style={{color: color}}>
            {title.length > MAX_LENGTH ?
              (
                <div className="font-medium text-left block">
                  {`${title.substring(0, MAX_LENGTH)}..`}
                </div>
              ) :
              <span className="font-medium text-left block">{title}</span>
            }
            {/*<div><span className="font-medium text-left block"> {title}</span>*/}
            {/*</div>*/}
            {type === 'large' &&
            <span className="font-bold text-xs flex flex-row" style={{color: "#f50057"}}>Second Release Ticket</span>
            }
            {/*Jaarbeurs Utrecht*/}
            {location.length > MAX_LENGTH_LOCATION ?
              (
                <div className="font-light text-xs flex flex-row">
                  {`${location.substring(0, MAX_LENGTH_LOCATION)}..`}
                </div>
              ) :
              <span className="font-light text-xs flex flex-row">{location}</span>
            }
            {/*<span className="font-light text-xs flex flex-row">{location}</span>*/}
          </div>
        </div>
        <div className="flex items-center flex-row">
          {type === 'organiser' && <Button
            onClick={() => {
              history.push(`/my-events/event-details/${eventId}`);
            }}
            variant="outlined"
            color="secondary"
            size="small"
          >Details</Button>}

          {type === 'eventDetail' && <div className="w-full"></div>}
        </div>
      </div>
    </div>
  );
};
