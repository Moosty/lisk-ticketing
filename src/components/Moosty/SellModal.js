import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {PortfolioItem} from "components/PortfolioItem";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {TicketListItem} from "components/index";

export const SellModal = (props) => {
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisItem = portfolio.find(item => item.ticketAddress === "12312341r555ff");

  useEffect(
    () => {
      console.log("sellmodal", portfolio);
      console.log("item", thisItem);

    },
  );

  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
         Sell ticket
        </div>



      <PortfolioItem
            type="sell"
            key={thisItem.ticketAddress}
            keyEvent={thisItem.eventId}
            ticketType={thisItem.ticketType}
          />

        <div className="text-left flex font-normal text-sm text-white">
          {props.content}
        </div>
        <div className="flex flex-row">
        <button
          variant="contained"
          size="small"
          color="secondary"
          className="m-4"
          >Cancel
        </button>
        <button
          variant="contained"
          size="small"
          color="secondary"
          className="m-4"
        >Cancel
        </button>
        </div>
      </div>
    </div>

  </div>;
}
