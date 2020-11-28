import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import moment from 'moment';
import { statuses } from "../store/reducers/blockchain/event.reducer";

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
  [statuses.DONE]: "#686a6b",
  [statuses.CANCELLED]: "#8c0404",
  [statuses.UPCOMING]: "#278c04",
  [statuses.OPEN_FOR_SALE]: "#278c04",
  [statuses.SOLD_OUT]: "#c35b0b",
  [statuses.NEW]: "#278c04",
}

export const EventAvatar = ({timestamp, status, badgeColor}) => {
  const [date, setDate] = useState(null)

  useEffect(() => {
    setDate(moment.unix(timestamp));
  }, [timestamp]);

  return (<StyledBadge
    overlap="circle"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    variant="dot">
    <Avatar variant="rounded" style={{backgroundColor: colors[status]}}>
      <div className="flex flex-col center items-center">
        <span className="text-xs">{date?.format('Do')}</span>
        <span className="text-xs">{date?.format('MMM')}</span>
      </div>
    </Avatar>
  </StyledBadge>);
}
