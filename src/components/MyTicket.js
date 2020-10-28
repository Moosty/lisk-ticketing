import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CropFreeTwoToneIcon from '@material-ui/icons/CropFreeTwoTone';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { DeleteOutline } from "@material-ui/icons";

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
  'active': "#00E676",
  'sale': "#FFEA00",
  'type3': ""
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


export const MyTicket = withReducer("myTicket", reducer)(({props, size, checkout, type, status, ticketType, keyEvent}) => {

// WE ZOEKEN DE EVENTDATA BIJ DE JUISTE TICKET
  const Events = useSelector(({blockchain}) => blockchain.event.events);
  const [thisEventData, setThisEventData] = useState(null);

  // WE ZOEKEN HET JUISTE TICKET TYPE VOOR DE GEGEVENS
  // const ticketData = thisEvent?.asset?.ticketData?.types.find(type => type.id === ticketType );

  const dispatch = useDispatch();
  // const history = useHistory();
  // const classes = useStyles();

  useEffect(() => {
      const thisEvent = Events.find(event => event.address === keyEvent);
      setThisEventData(thisEvent?.asset?.eventData);
    }, [Events],
  );

  useEffect(() => {
    console.log("MyTIckets this event", thisEventData);
  }, [thisEventData])

  return (<div className=" w-full  ">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center my-3 "
        >
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar variant="rounded" style={{backgroundColor: colors[status]}}>
              <div className="flex flex-col center items-center">
                <span className="text-xs">{thisEventData?.eventDate?.getDate()}</span>
                <span className="text-xs">{monthNames[thisEventData?.eventDate?.getMonth()]}</span>
              </div>
            </Avatar>
          </StyledBadge>

          <div className="flex flex-col text-sm leading-4 mx-2">
            <div><span className="font-bold text-left block">{thisEventData?.title}</span>
              <span className=""></span>
            </div>
            {size === 'large' &&
            <span className="font-bold text-xs flex flex-row" style={{color: "#f50057"}}>Second Release Ticket</span>
            }
            <span className="font-light text-xs flex flex-row">{thisEventData?.location}</span>
          </div>
        </div>

        {size === 'small' &&
        <div className="flex items-center flex-row">

          <IconButton

            color="secondary"
          >
            <CropFreeTwoToneIcon color="white"/>
          </IconButton>
          <IconButton

            color="secondary"
            onClick={() => {
              // console.log("myticket = ", thisEvent);
              console.log("myticket = ", thisEventData);

              dispatch(Actions.openModal('scanTicketModal'))
            }}
          >
            <MoreVertIcon color="white"/>
          </IconButton>
        </div>
        }
        {size === 'large' &&
        <div className="flex items-center flex-row w-4/12">
          <div className="flex flex-col text-right text-xs font-bold">
            <span className="text-sm"> € 45.00</span>
            <span> SAT 22:00H</span>
          </div>
          <div className="">

          </div>

        </div>
        }
        {checkout === 'true' &&
        <div className="flex items-center flex-row">

          <IconButton

            color="secondary"
          >
            <DeleteOutline color="white"/>
          </IconButton>

        </div>
        }
      </div>


      <Divider/>
    </div>
  );
});
