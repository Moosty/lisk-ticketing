/* global BigInt */
import React, { useEffect, useState } from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import { useDispatch, } from "react-redux";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";
import QrReader from 'react-qr-reader'
import { createTransaction, Schema } from "../../utils/transactions";
import { sendTransactions } from "../../utils/api";
import { useAccount, useChain, useTickets } from "../../utils/hooks";

export const ConfirmTxModal = (props) => {
  const dispatch = useDispatch();
  const {updateChain} = useChain();
  const {account} = useAccount();
  const {tickets} = useTickets();
  const [scanned, setScanned] = useState(null);
  const [error, setError] = useState(null);

  const handleError = err => {
    console.log(err)
  }

  const handleScan = data => {
    const dataSplit = data?.split(':');
    if (dataSplit?.length === 2) {
      const ticket = tickets?.find(t => t.id === dataSplit[0]);

      if (ticket?.eventId === props.id) {
        setScanned(data);
      } else {
        setError("This ticket is not for this event");
      }
    }
  }

  const giveAccess = async () => {
    const dataSplit = scanned?.split(':');

    const assets = {
      ticketId: new Buffer.from(dataSplit[0], 'hex'),
      ownerId: new Buffer.from(dataSplit[1], 'hex'),
    }
    const transaction = await createTransaction({
      moduleId: 1200,
      assetId: 2,
      fee: '0.01',
      assets: {
        ...assets,
      },
      passphrase: account.passphrase,
      schema: Schema.scanTicketSchema,
    });

    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: confirmScan
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: confirmScan
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: confirmScan
      }));
    }
  }

  const confirmScan = async () => {
    updateChain();
    setScanned(null);

    dispatch(Actions.openModal('scanEvent', props));
  }

  return <div className={`text-center items-center ${scanned ? 'bg-green-600' : error ? 'bg-red-600' : 'bg-gray-900'} p-4 h-full`}>
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col">
        {/* GENERAL TX CONFIRM */}
        {props.type === 'confirmTx' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white text-center pb-4">
            <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
              {props.title}</div>
            <div className="my-6">{props.subText}</div>
          </div>
          <div className="flex flex-row justify-around mt-2">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => {
                dispatch(Actions.closeModal())
              }}>Cancel</Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => dispatch(Actions.closeModal()) && props.confirm()}
            >Confirm Transaction</Button>
          </div>
        </div>}

        {props.type === 'scanEvent' && <div>
          <div className={`flex flex-col text-left flex font-normal text-sm text-white`}>
            <h1 className="text-lg mt-4 font-bold">Scan ticket</h1>
            <div>{error}</div>
          </div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <div className="flex flex-row justify-around mt-2">
            {scanned && <Button
              variant="contained"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => giveAccess()}>OK</Button>}
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="m-4"
              onClick={() => {
                dispatch(Actions.closeModal())
              }}>Cancel</Button>
          </div>
        </div>}
        {/*  CREATE EVENT MODAL */}
        {props.type === 'confirmEvent' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white">
            <h1 className="text-lg mt-4 font-bold">Confirm this action</h1>
            <div>Please confirm the <span className="font-bold text-pink-400">creation</span> of this event.
            </div>
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
              onClick={() => dispatch(Actions.closeModal()) && props.confirm()}
            >Confirm Transaction
            </Button>
          </div>
        </div>}
        {/*  CANCEL EVENT MODAL */}
        {props.type === 'confirmCancelEvent' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white">
            <h1 className="text-lg mt-4 font-bold">Confirm this action</h1>
            <div>Fill in the <span className="font-bold text-pink-400">organisation key </span> to confirm the
              cancellation of this event.
            </div>
            <TextField
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderColor: "white",
                backgroundColor: "white",
                borderRadius: "5px"
              }}
              id="outlined-basic" label="Organization Passphrase" variant="filled" color="secondary"/>
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
                dispatch(Actions.closeModal())
              }}
            >Confirm Transaction
            </Button>
          </div>
        </div>}
        {/*  BUY TICKETS MODAL */}
        {props.type === 'confirmBuyTickets' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white ">
            <h1 className="text-lg mt-4 font-bold">Confirm this action</h1>
            <div>Fill in <span className="font-bold text-pink-400">your private key </span> to confirm buying the
              ticket(s).
            </div>
            <TextField
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderColor: "white",
                backgroundColor: "white",
                borderRadius: "5px"
              }}
              id="outlined-basic" label="Passphrase address" variant="filled" color="secondary"/>
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
                dispatch(Actions.closeModal())
              }}
            >Confirm Transaction
            </Button>
          </div>
        </div>}
        {/*  CONFIRM ACTION */}
        {props.type === 'confirmAction' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white">
            <h1 className="text-lg mt-4 font-bold">Confirm this action</h1>
            <div>Fill in <span className="font-bold text-pink-400">your private key </span> to confirm.
            </div>
            <TextField
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderColor: "white",
                backgroundColor: "white",
                borderRadius: "5px"
              }}
              id="outlined-basic" label="Passphrase" variant="filled" color="secondary"/>
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
        </div>}
      </div>
    </div>
  </div>;
}
