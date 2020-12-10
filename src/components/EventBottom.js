import React from "react";
import Button from "@material-ui/core/Button";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import CropFreeTwoToneIcon from "@material-ui/icons/CropFreeTwoTone";
import { useHistory, useParams } from "react-router-dom";
import { createTransaction, Schema } from "../utils/transactions";
import { sendTransactions } from "../utils/api";
import { API } from "../utils";
import { useEvent } from "utils/hooks/event";
import { statuses } from "store/reducers/blockchain/event.reducer";

export const EventBottom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const {event} = useEvent(id);

  const cancelConfirmed = async () => {
    const events = await API.fetchAllEvents();
    if (events) {
      events.map(e => dispatch(Actions.addEvent(e)));
    }
    history.push(`/organizer`);
  }

  const confirmCancel = async () => {
    const assets = {
      id
    }
    const transaction = await createTransaction({
      moduleId: 1100,
      assetId: 1,
      fee: '0.01',
      assets: {
        ...assets,
      },
      passphrase: account.passphrase,
      schema: Schema.cancelEventSchema,
    });

    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: cancelConfirmed
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: cancelConfirmed
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: cancelConfirmed
      }));
    }
  }

  return (
    <div className="bottom-0 fixed z-50 bg-gray-900 text-white " style={{maxWidth: '450px', width: '100%'}}>
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        {(event?.eventData?.status !== statuses.CANCELLED && event?.eventData?.status !== statuses.DONE) && <Button
          onClick={() => dispatch(Actions.openModal('confirmTx', {
            title: "Confirm transaction",
            subText: (
              <div>Confirm the <span className="font-bold text-pink-400">cancellation</span> of this event.</div>),
            confirm: confirmCancel,
          }))}
          variant="outlined"
          size="small"
          color="secondary"
        >Cancel Event</Button>}
        <IconButton onClick={() => dispatch(Actions.openModal('scanEvent', {
          id: event.id,
        }))}>
          <CropFreeTwoToneIcon color="secondary"/>
        </IconButton>
      </div>
    </div>
  );
};
