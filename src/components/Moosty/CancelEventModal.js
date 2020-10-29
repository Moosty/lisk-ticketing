import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {MyTicket, TicketListItem} from "components/index";
import { SliderPrice } from "components/SliderPrice";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";

export const CancelEventModal = (props) => {
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisItem = portfolio.find(item => item.ticketAddress === "12312341r555ff");
  const dispatch = useDispatch();

  var React = require('react');
  var QRCode = require('qrcode.react');

  useEffect(
    () => {

    },
  );

  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">


        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          {props.title}
          {props.content}

        </div>


        <div className="bg-white rounded my-4 px-2">
          <MyTicket status="sale" type="large" keyEvent={props.keyEvent} />
        </div>

        { props.type === 'optionsModal' && <div>
          <Button
            fullWidth= "true"
            variant="contained"
            size="Large"
            color="secondary"
            className="m-4"
            onClick={() => {
              dispatch(Actions.openModal('scanTicketModal'))
            }}
          >Cancel
          </Button>





        </div>}







      </div>
    </div>

  </div>;
}
