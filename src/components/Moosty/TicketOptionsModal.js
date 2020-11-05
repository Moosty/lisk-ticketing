import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {MyTicket, } from "components/index";
import { SliderPrice } from "components/SliderPrice";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";

export const TicketOptionsModal = ({keyEvent, type, status, size, ticketType, thisTicketType, reSellPercentage}) => {
  const dispatch = useDispatch();
  var React = require('react');
  var QRCode = require('qrcode.react');

  useEffect(
    () => {
    console.log("modal this ticket", thisTicketType);
    },
  );

  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">


        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          { type === 'optionsModal' && 'Options' }
          { type === 'scanModal' && 'Scan Ticket' }
          { type === 'sellModal' && 'Sell Ticket' }
          { type === 'transferModal' && 'Transfer Ticket' }
        </div>


    <div className="bg-white rounded my-4 px-2">
      <MyTicket
        keyEvent={keyEvent}
        ticketType={ticketType}
        status={status}
        size={size}
      />
    </div>

        { type === 'optionsModal' && <div>
        <Button
          fullWidth= "true"
          variant="contained"
          size="large"
          color="secondary"
          className="m-4"
          onClick={() => {
            dispatch(Actions.openModal('scanTicketModal',{keyEvent, size, status}))
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
              dispatch(Actions.openModal('transferTicketModal', {keyEvent, size, status}))
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
              dispatch(Actions.openModal('sellTicketModal', {keyEvent, size, status, thisTicketType, reSellPercentage}))
            }}
          >Sell ticket
          </Button>




        </div>}

        {/* SCAN TICKET MODAL */}

        { type === 'scanModal' && <div>

          <div className="bg-white rounded my-4 p-10 content-center flex justify-center">
            <QRCode value={keyEvent} />
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

        { type === 'sellModal' && <div>


        <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >
          <div className="flex flex-row justify-around rounded my-2 py-2" style={{backgroundColor:"#f50057"}}>
            <div className="flex flex-col text-center">
              <div>Original price:</div>
              <div className="font-bold text-2xl">
                {/* TODO BIJ EEN NIEUWE TICKET IS DIT OP TE ZOEKEN IN ASSET.TICKETDATA. BIJ EEN TWEEDEHANDS NIET*/}
                € {thisTicketType.price}
              </div>
            </div>
            <div className="flex flex-col text-center">
              <div>Sell ticket for:</div>
              <div className="font-bold text-2xl">
                € 25.00
              </div>
            </div>
          </div>

          <SliderPrice reSellPercentage={reSellPercentage} />
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
            onClick={() => {
              dispatch(Actions.openModal('confirmTxModal'))
            }}
          >Put on marketplace
          </Button>
        </div>
        </div>}

        {/*  TRANSFER MODAL */}

        { type === 'transferModal' && <div>
        <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >

          <h1
            className="text-lg mt-4 font-bold" >Send your ticket to a friend!</h1>
          <div>Fill in the <span className="font-bold text-pink-400">recipient address </span> and confirm to send this ticket.
        </div>
          <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                     id="outlined-basic" label="Recipient address" variant="filled" color="secondary" />


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
            onClick={() => {
              dispatch(Actions.openModal('confirmTxModal'))
            }}
          >Transfer ticket
          </Button>
        </div>
        </div> }


      </div>
    </div>

  </div>;
}
