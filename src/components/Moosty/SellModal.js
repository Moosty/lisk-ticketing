import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {PortfolioItem} from "components/PortfolioItem";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {TicketListItem} from "components/index";

export const SellModal = (props) => {


  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
         Sell ticket
        </div>
        <PortfolioItem
          type="sell"
          key="1"
          keyEvent="asdffqwerkqjewrflqkwejfL"
          ticketType="type3"
          eventId="asdffqwerkqjewrflqkwejfL"
          eventDate="12-12-2020"
          eventTime="20.00"
          title="test ticket"
          day="5"
          month="8"
          price="€ 5"
          time="5am"
          name="name"
          artist="Bertus de zanger"
          location="Utrecht"

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
