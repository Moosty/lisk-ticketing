import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {MyTicket, TicketListItem} from "components/index";
import { SliderPrice } from "components/SliderPrice";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";

export const TicketOptionsModal = (props) => {
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
          { props.type === 'optionsModal' && 'Options' }
          { props.type === 'scanModal' && 'Scan Ticket' }
          { props.type === 'sellModal' && 'Sell Ticket' }
          { props.type === 'transferModal' && 'Transfer Ticket' }
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
        >Scan ticket
        </Button>


          <Button
            fullWidth= "true"
            variant="contained"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.openModal('transferTicketModal'))
            }}
          >Transfer ticket
          </Button>
          <Button
            fullWidth= "true"
            variant="outlined"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.openModal('sellTicketModal'))
            }}
          >Sell ticket
          </Button>




        </div>}

        {/* SCAN TICKET MODAL */}

        { props.type === 'scanModal' && <div>

          <div className="bg-white rounded my-4 p-10 content-center flex justify-center">
            <QRCode value={props.keyEvent} />
          </div>


        <div className="flex flex-row justify-around mt-2">
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          className="m-4"
          onClick={() => {
            dispatch(Actions.closeModal())
          }}
          >Cancel
        </Button>

        </div>
        </div>}

        {/*  SELL MODAL */}

        { props.type === 'sellModal' && <div>


        <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >
          <div className="flex flex-row justify-around rounded my-2 py-2" style={{backgroundColor:"#f50057"}}>
            <div className="flex flex-col text-center">
              <div>Ticket bought for:</div>
              <div className="font-bold text-2xl">
                € 25.00
              </div>
            </div>
            <div className="flex flex-col text-center">
              <div>Sell ticket for:</div>
              <div className="font-bold text-2xl">
                € 25.00
              </div>
            </div>
          </div>

          <SliderPrice />
        </div>

        <div className="flex flex-row justify-around mt-2">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className="m-4"
            onClick={() => {
              dispatch(Actions.closeModal())
            }}
          >Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className="m-4"
          >Sell ticket
          </Button>
        </div>
        </div>}

        {/*  TRANSFER MODAL */}

        { props.type === 'transferModal' && <div>
        <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >

          <h1
            className="text-lg mt-4 font-bold" >Send your ticket to a friend!</h1>
          <div>Fill in the <span className="font-bold text-pink-400">recipient address </span> and confirm to send this ticket.
        </div>
          <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                     id="outlined-basic" label="Recipient adress" variant="filled" color="secondary" />


        </div>

        <div className="flex flex-row justify-around mt-2">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className="m-4"
            onClick={() => {
              dispatch(Actions.closeModal())
            }}

          >Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className="m-4"
          >Transfer ticket
          </Button>
        </div>
        </div> }


      </div>
    </div>

  </div>;
}
