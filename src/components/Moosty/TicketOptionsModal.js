/* global BigInt */
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useHistory } from "react-router-dom";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { MyTicket, } from "components/index";
import { SliderPrice } from "components/SliderPrice";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";
import { useAccount, useChain, useEvent, useTickets } from "../../utils/hooks";
import { ticketStatuses } from "../../store/reducers/blockchain/portfolio.reducer";
import { createTransaction, Schema } from "../../utils/transactions";
import { sendTransactions } from "../../utils/api";
import { transactions } from "@liskhq/lisk-client";
import { API } from "../../utils";

export const TicketOptionsModal = ({type, size, ticketId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {updateChain} = useChain();
  const {account} = useAccount();
  const {myTicket, tickets} = useTickets(ticketId);
  const {event, events} = useEvent(myTicket?.eventId);
  const [recipient, setRecipient] = useState("");
  const [resellPercentage, setResellPercentage] = useState(null);
  const [sellPrice, setSellPrice] = useState(event?.resellData?.maximumResellPercentage);
  const [updating, setUpdating] = useState(false);
  const doTransfer = async () => {
    const assets = {
      ticketId: new Buffer.from(ticketId, 'hex'),
      recipientAddress: new Buffer.from(recipient, 'hex')
    }
    const transaction = await createTransaction({
      moduleId: 1200,
      assetId: 1,
      fee: '0.01',
      assets: {
        ...assets,
      },
      passphrase: account.passphrase,
      schema: Schema.transferTicketSchema,
    });

    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: confirmTransfer
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: confirmTransfer
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: confirmTransfer
      }));
    }
  }

  const confirmTransfer = async () => {
    updateChain();
    dispatch(Actions.closeModal());
  }

  const sellTicket = async () => {
    const assets = {
      ticketId: new Buffer.from(ticketId, 'hex'),
      price: BigInt(sellPrice.toString()),
    }
    const transaction = await createTransaction({
      moduleId: 1200,
      assetId: 3,
      fee: '0.01',
      assets: {
        ...assets,
      },
      passphrase: account.passphrase,
      schema: Schema.sellTicketSchema,
    });

    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: confirmTransfer
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: confirmTransfer
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: confirmTransfer
      }));
    }
  }

  useEffect(() => {
    if (!resellPercentage && event?.resellData?.maximumResellPercentage) {
      setResellPercentage(event?.resellData?.maximumResellPercentage < 100 ? event?.resellData?.maximumResellPercentage : 100);
    } else {
      setSellPrice(resellPercentage ? BigInt(resellPercentage) * BigInt(myTicket?.value / 100) : 0)
    }
  }, [event, resellPercentage, myTicket]);

  useEffect(() => {
    const updateInterval = async () => {
      setTimeout(async () => {
        const ticket = await API.fetchTicket(ticketId);
        if (ticket?.status === ticketStatuses.SCANNED) {
          setUpdating(false);
          updateChain()
          dispatch(Actions.openModal('welcomeModal'))
        } else if (updating > 30) {
          dispatch(Actions.closeModal());
        } else {
          setUpdating(updating+1);
          updateInterval();
        }
      }, 1000);
    }
    if (type === 'scanModal' && !updating) {
      setUpdating(1);
      updateInterval();
    }
  }, [type, myTicket, updating]);

  return <div className={`text-center items-center ${type === 'welcomeModal' ? 'bg-green-900' : 'bg-gray-900'} p-4 h-full w-full `}>
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          {type === 'optionsModal' && 'Options'}
          {type === 'scanModal' && 'Scan Ticket'}
          {type === 'sellModal' && 'Sell Ticket'}
          {type === 'transferModal' && 'Transfer Ticket'}
          {type === 'welcomeModal' && 'Enjoy the event!'}
        </div>
        <div className="bg-white rounded my-4 px-2">
          <MyTicket
            keyEvent={`${ticketId}-ticket`}
            ticketType={myTicket?.typeId}
            {...myTicket}
            size={size}
          />
        </div>
        {type === 'welcomeModal' && <div>
          Enjoy the event
          <Button
            fullWidth="true"
            variant="outlined"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.closeModal())
            }}>
            Close
          </Button>
        </div>}
        {myTicket?.status === ticketStatuses.OWNED && type === 'optionsModal' && <div>
          <Button
            fullWidth="true"
            variant="contained"
            size="large"
            color="secondary"
            className="m-4"
            onClick={() => {
              dispatch(Actions.openModal('scanModal', {size, ticketId}))
            }}>
            Scan ticket
          </Button>
          <Button
            fullWidth="true"
            variant="contained"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.openModal('transferModal', {size, ticketId}))
            }}>
            Transfer ticket
          </Button>
          <Button
            fullWidth="true"
            variant="outlined"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.openModal('sellModal', {size, ticketId}))
            }}>
            Sell ticket
          </Button>
          <Button
            fullWidth="true"
            variant="outlined"
            size="small"
            color="secondary"
            style={{marginTop: "1rem"}}
            onClick={() => {
              dispatch(Actions.closeModal())
            }}>
            Cancel
          </Button>
        </div>}
        {myTicket?.status !== ticketStatuses.OWNED && type === 'optionsModal' && <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{marginTop: "1rem"}}
          onClick={() => {
            dispatch(Actions.closeModal())
          }}>
          Cancel
        </Button>}
        {/* SCAN TICKET MODAL */}
        {type === 'scanModal' && <div>
          <div className="bg-white rounded my-4 p-10 content-center flex justify-center">
            <QRCode value={`${ticketId}:${myTicket?.ownerAddress}`}/>
          </div>
          <div className="flex flex-row justify-around mt-2">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => {
                dispatch(Actions.closeModal())
              }}>
              Cancel
            </Button>
          </div>
        </div>}

        {/*  SELL MODAL */}
        {type === 'sellModal' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white my-2">
            <div className="flex flex-row justify-around rounded my-2 py-2" style={{backgroundColor: "#f50057"}}>
              <div className="flex flex-col text-center">
                <div>Original price:</div>
                <div className="font-bold text-2xl">
                  € {myTicket?.value ? transactions.convertBeddowsToLSK(myTicket?.value.toString()) : '0.00'}
                </div>
              </div>
              <div className="flex flex-col text-center">
                <div>Sell ticket for:</div>
                <div className="font-bold text-2xl">
                  € {sellPrice ? transactions.convertBeddowsToLSK(sellPrice.toString()) : '0.00'}
                </div>
              </div>
            </div>
            <SliderPrice reSellPercentage={event?.resellData?.maximumResellPercentage}
                         changeSlider={(e, newValue) => setResellPercentage(Number(newValue))}/>
          </div>
          <div className="flex flex-row justify-around mt-2">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => {
                dispatch(Actions.closeModal())
              }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => sellTicket()}>
              Put on marketplace
            </Button>
          </div>
        </div>}

        {/*  TRANSFER MODAL */}
        {type === 'transferModal' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white my-2">
            <h1
              className="text-lg mt-4 font-bold">Send your ticket to a friend!</h1>
            <div>Fill in the <span className="font-bold text-pink-400">recipient address </span> and confirm to send
              this ticket.
            </div>
            <TextField
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderColor: "white",
                backgroundColor: "white",
                borderRadius: "5px"
              }}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              id="outlined-basic" label="Recipient address" variant="filled" color="secondary"/>
          </div>
          <div className="flex flex-row justify-around mt-2">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => {
                dispatch(Actions.closeModal())
              }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => doTransfer()}
            >Transfer ticket
            </Button>
          </div>
        </div>}
      </div>
    </div>
  </div>;
}
