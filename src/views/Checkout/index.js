/* global BigInt */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import Button from "@material-ui/core/Button";
import { MyTicket } from "components/MyTicket";
import * as Actions from "store/actions";
import { useBasket } from "utils/hooks/basket";
import { transactions } from "@liskhq/lisk-client";
import { Schema } from "utils";
import { createTransaction } from "utils/transactions";
import { fetchAccountInfo, sendTransactions } from "utils/api";
import { useHistory } from "react-router-dom";

export const Checkout = withReducer("checkout", reducer)(() => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {total, items, ticketCount} = useBasket();
    const {events} = useSelector(({blockchain}) => blockchain.event);
    const {account} = useSelector(({blockchain}) => blockchain.account);

    const txsConfirmed = async () => {
      dispatch(Actions.emptyBasket());
      history.push(`/overview`);
    }

    const onConfirm = async () => {
      let nonce = null;
      const accountInfo = await fetchAccountInfo(account.address);
      if (accountInfo?.sequence?.nonce) {
        nonce = Number(accountInfo.sequence.nonce);
      }
      let transactions = [];
      let x = null;
      let count = 0;
      for (x in items) {
        const item = items[x];
        if (!item?.id) {
          const value = events.find(e => e.id === item.eventId)?.ticketData?.find(td => td.id === item.ticketType)?.price;
          const assets = {
            eventId: item.eventId,
            typeId: item.ticketType,
            value: BigInt(value),
          }
          for (let i = 0; i < item.quantity; i++) {
            transactions.push(await createTransaction({
              moduleId: 1200,
              assetId: 0,
              fee: '0.01',
              assets: {
                ...assets,
              },
              passphrase: account.passphrase,
              schema: Schema.buyTicketSchema,
              nonce: nonce + count,
            }));
            count++;
          }
        } else {
          const assets = {
            marketId: new Buffer.from(item.id, 'hex'),
          };
          transactions.push(await createTransaction({
            moduleId: 1200,
            assetId: 4,
            fee: '0.01',
            assets: {
              ...assets,
            },
            passphrase: account.passphrase,
            schema: Schema.buyMarketTicketSchema,
            nonce: nonce + count,
          }));
          count++;
        }
      }
      dispatch(Actions.openModal('transactionModal', {
        success: false,
        loading: true,
        onConfirmation: txsConfirmed,
        multi: transactions,
      }));
      transactions.map(async transaction => {
        const result = await sendTransactions(transaction?.tx);

        if (result.errors) {
          dispatch(Actions.openModal('transactionModal', {
            id: transaction?.id,
            success: false,
            loading: false,
            error: result.errors,
            onConfirmation: txsConfirmed
          }));
        } else {
          dispatch(Actions.openModal('transactionModal', {
            id: transaction?.id,
            success: false,
            loading: true,
            onConfirmation: txsConfirmed
          }));
        }
      })
    }

    return (<div>
      <div className="pt-10 bg-gray-900 fixed h-screen text-white overflow-y-auto " style={{maxWidth: '450px', width: '450px'}}>
        <div className="py-5 h-full flex flex-col ">
          <h1
            className="mx-10 text-4xl leading-10 sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">
            Checkout
          </h1>
          <div className="p-6 pr-2">
            {items && items
              .sort((a, b) => {
                if (a.eventId.toLowerCase() < b.eventId.toLowerCase()) return -1;
                if (a.eventId.toLowerCase() > b.eventId.toLowerCase()) return 1;
                return 0;
              })
              .map(item => {
                let ticketGroup = [];
                for (let i = 0; i < item.quantity; i++) {
                  ticketGroup.push(<MyTicket
                    size="large"
                    eventId={item.eventId}
                    checkout="true"
                    key={`${item.eventId}-${i}`}
                    keyEvent={item.eventId}
                    ticketType={item.ticketType}
                    marketId={item?.id}
                    value={item?.value}
                  />);
                }
                return ticketGroup;
              }).flat()
            }
          </div>
          <div className="fixed left-0 z-50 p-4 bottom-0 flex flex-row bg-gray-900 justify-between" style={{maxWidth: '450px', width: '450px'}}>
            <div className="flex-col mx-4 ">
              <div className="leading-4">
                <span className="text-xs">You have <span className="font-bold text-pink-400">{ticketCount}</span> tickets in your basket</span>
              </div>
              <div className="">
                <span className="font-bold">Total Costs </span>
                <span className="font-bold">€ {total ? transactions.convertBeddowsToLSK(total.toString()) : '0.00'}</span>
              </div>
            </div>
            {total > BigInt(0) && <Button
              onClick={() => {
                dispatch(Actions.openModal('confirmTx', {
                  title: "Confirm transaction",
                  subText: (
                    <div>Confirm the <span className="font-bold text-pink-400">buy {ticketCount}</span> tickets
                      worth <span className="font-bold text-pink-400">
                      € {total ? transactions.convertBeddowsToLSK(total.toString()) : '0.00'}</span>.
                    </div>),
                  confirm: onConfirm,
                }))
              }}
              variant="contained"
              size="small"
              color="secondary"
              className="m-20"
            >Buy Tickets</Button>}
          </div>
        </div>
      </div>
    </div>)
  })
;
