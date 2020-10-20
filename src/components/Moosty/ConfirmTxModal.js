
import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {PortfolioItem} from "components/PortfolioItem";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {TicketListItem} from "components/index";
import { SliderPrice } from "components/SliderPrice";
import * as Actions from "../../store/actions";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

export const ConfirmTxModal = (props) => {
  const portfolio = useSelector(({blockchain}) => blockchain.portfolio.items);
  const thisItem = portfolio.find(item => item.ticketAddress === "12312341r555ff");
  const dispatch = useDispatch();


  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">


        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          { props.type === 'confirmEvent' && 'Create Event' }
          { props.type === 'confirmBuyTickets' && 'Buy Tickets' }

        </div>


        <div className="bg-white rounded my-4">
          <PortfolioItem
            type=""
            key={thisItem.ticketAddress}
            keyEvent={thisItem.eventId}
            ticketType={thisItem.ticketType}
          />
        </div>

        {/*  CREATE EVENT MODAL */}

        { props.type === 'confirmEvent' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in the <span className="font-bold text-pink-400">organisation key </span> to confirm the creation of this event.
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
            >Confirm Transaction
            </Button>
          </div>
        </div> }

        {/*  BUY TICKETS MODAL */}

        { props.type === 'confirmBuyTickets' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white my-2" >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in <span className="font-bold text-pink-400">your private key </span> to confirm buying the ticket(s).
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
            >Confirm Transaction
            </Button>
          </div>
        </div> }

      </div>
    </div>

  </div>;
}
