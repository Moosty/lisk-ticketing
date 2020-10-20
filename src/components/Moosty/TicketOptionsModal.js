import React, {useEffect, useState} from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {PortfolioItem} from "components/PortfolioItem";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {TicketListItem} from "components/index";
import { SliderPrice } from "components/SliderPrice";

export const TicketOptionsModal = (props) => {
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
          { props.type === 'scanModal' && 'Scan Ticket' }
          { props.type === 'sellModal' && 'Sell Ticket' }
          { props.type === 'transferModal' && 'Transfer Ticket' }
        </div>


    <div className="bg-white rounded my-4">
      <PortfolioItem
            type=""
            key={thisItem.ticketAddress}
            keyEvent={thisItem.eventId}
            ticketType={thisItem.ticketType}
          />
    </div>

        {/* SCAN TICKET MODAL */}

        { props.type === 'scanModal' && <div>

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
        </div> }


      </div>
    </div>

  </div>;
}
