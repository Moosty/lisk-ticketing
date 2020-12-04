import React from "react";
import { withStyles } from '@material-ui/core/styles';
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import Badge from '@material-ui/core/Badge';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CropFreeTwoToneIcon from '@material-ui/icons/CropFreeTwoTone';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { DeleteOutline } from "@material-ui/icons";
import { ticketStatuses } from "../store/reducers/blockchain/portfolio.reducer";
import { useEvent } from "../utils/hooks/event";
import { transactions } from "@liskhq/lisk-client";
import { EventAvatar } from "components/EventAvatar";

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
  [ticketStatuses.OWNED]: "#00E676",
  [ticketStatuses.SELLING]: "#FFEA00",
  [ticketStatuses.PAST_EVENT]: "#f50057",
  [ticketStatuses.SOLD]: "#f50057",
}

export const MyTicket = withReducer("myTicket", reducer)(({
                                                            size,
                                                            checkout,
                                                            status,
                                                            eventId,
                                                            ticketType,
                                                            keyEvent,
                                                            id,
                                                            marketId,
                                                            value,
                                                            i
                                                          }) => {
  const dispatch = useDispatch();
  const {event} = useEvent(eventId);
  const MAX_LENGTH = 40;

  return (<div className={` w-full ${i === 0 ? "bg-gray-300" : ""}`}>
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center my-3 w-full ">
        <EventAvatar timestamp={event?.eventData?.date} status={event?.eventData?.status}/>

        <div className={`flex flex-col text-xs leading-4 mx-2 w-full`}>
          {event?.eventData?.title?.length > MAX_LENGTH ?
            (<div className="font-bold text-left block">
              {`${event?.eventData?.title?.substring(0, MAX_LENGTH)}...`}
            </div>) : <span className="font-bold text-left block">{event?.eventData?.title}</span>}
          <div>
            {/*<span className="font-bold text-left block">{thisEventData?.title}</span>*/}

          </div>
          {size === 'large' &&
          <span className="font-bold text-xs flex flex-row text-left"
                style={{color: "#f50057"}}>{event?.ticketData?.find(td => td.id === ticketType)?.name}</span>}
          {event?.eventData?.location.length > MAX_LENGTH ?
            (<div className="font-light text-xs flex flex-row text-left">
              {`${event?.eventData?.location.substring(0, MAX_LENGTH)}...`}
            </div>) : <span className="font-light text-xs flex flex-row text-left">{event?.eventData?.location}</span>}
          {/*<span className="font-light text-xs flex flex-row">{thisEventData?.location}</span>*/}
        </div>
      </div>

      {size === 'small' && <div className="flex items-center flex-row">
        {status === ticketStatuses.OWNED && <IconButton
          onClick={() => {
            dispatch(Actions.openModal('scanModal', {
              size: "large",
              ticketId: id
            }))
          }}
          color="secondary">
          <CropFreeTwoToneIcon color="secondary"/>
        </IconButton>}
        {status === ticketStatuses.MARKET && <span className="font-bold text-center text-xs">IN SALE</span>}
        {status === ticketStatuses.CANCELED && <span className="font-bold text-center text-xs">Canceled</span>}
        <IconButton
          color="secondary"
          onClick={() => {
            dispatch(Actions.openModal('optionsModal', {
              size: "large",
              ticketId: id
            }))
          }}
        >
          <MoreVertIcon color="secondary"/>
        </IconButton>
      </div>
      }
      {size === 'large' &&
      <div className="flex items-center flex-row w-4/12">
        <div className="flex flex-col text-right text-xs font-bold">
          <span
            className="text-sm"> €
            {!marketId && event?.ticketData?.find(td => td.id === ticketType)?.price ?
              transactions.convertBeddowsToLSK(event?.ticketData?.find(td => td.id === ticketType)?.price.toString()) :
              ''}
            {marketId && value && transactions.convertBeddowsToLSK(value.toString())}
          </span>
          {/*<span> {days[event?.eventData?.eventDate.getDay()]} {thisEventData?.eventTime}H</span>*/}
        </div>
      </div>}
      {checkout === 'true' &&
      <div className="flex items-center flex-row">
        <IconButton
          onClick={() => dispatch(Actions.removeItem(eventId, ticketType))}
          color="secondary">
          <DeleteOutline color="white"/>
        </IconButton>
      </div>}
    </div>
  </div>);
});
