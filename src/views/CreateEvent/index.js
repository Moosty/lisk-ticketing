/* global BigInt */
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import { OrganiserHeader } from "components/OrganiserHeader";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import { FormField } from "components/FormField";
import HelpIcon from '@material-ui/icons/Help';
import IconButton from "@material-ui/core/IconButton";
import { createTransaction, Schema } from "../../utils/transactions";
import { transactions } from "@liskhq/lisk-client";
import { sendTransactions } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { API } from "../../utils";
import { useOrganizer } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"

const categories = [
  {
    value: "yes",
    label: "YES",
  },
  {
    value: "no",
    label: "NO",
  },
];


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparant',
  },
  root: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h1: {
    color: 'white',
  },
  field: {
    borderRadius: 5,
    backgroundColor: 'white',
    border: 'none',
    '& .MuiFilledInput-root	': {

      border: 'none',
      borderRadius: 10,
      fontSize: '0.9rem',
      fontWeight: '600',
      backgroundColor: 'white!important',
    },

    '& .MuiFilledInput-underline:after ': {
      border: 'none',
    },
    '& .MuiFilledInput-underline:before ': {
      border: 'none',
    },
    '& .MuiFormLabel-root.Mui-focused ': {
      color: '#f50057',
    }
  },
}));

// TODO: header aanpassen (LATER)
// TODO: Status Event meegeven (REDUCER?) (ZA 17 - 10)

// TODO: textfield module maken? (ZA 17 - 10)
// TODO: Tickettype module maken? (ZA 17 - 10)
// TODO: modals aanpassen (LATER)

// let filledArray = [...new Array(10)].map(()=> {'hello':'goodbye'});
// ticketData: { types: [] }
//ticketData.types[]
// map over
const fields = [
  {label: "Title", path: "asset.eventData.title", type: "text", limit: 50},
  {label: "Location", path: "asset.eventData.location", type: "text", limit: 50},
  {label: "Event date", path: "asset.eventData.eventDate", type: "date"},
  {label: "Start Time", path: "asset.eventData.eventTime", type: "time"},
  {label: "Duration event", path: "asset.eventData.duration", type: "number"},
];

const ticketTypeFields = [
  {label: "Name", path: "name", type: "text"},
  {label: "Price", path: "price", type: "number"},
  {label: "Amount available", path: "amount", type: "number"},
];

const resellFields = [
  {label: "Can buyers resell your tickets", path: "asset.resellData.allowed", type: "checkbox"},
  {label: "Max resell percentage", path: "asset.resellData.maximumResellPercentage", type: "number"},
  {label: "Resell fee percentage", path: "asset.resellData.resellOrganiserFee", type: "number"},
];

export const CreateEvent = withReducer("createEvent", reducer)((props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const organizer = useOrganizer(true, '/login');

  const MAX_LENGTH = 15;
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const event = useSelector(({blockchain}) => blockchain.event);
  const [form, setForm] = useState(event.createEvent);

  useEffect(() => {
    setForm(event.createEvent);
  }, [event]);

  const updateField = (path, value) => dispatch(Actions.updateCreateEvent(path, value));
  const updateFieldType = (path, index, value) => dispatch(Actions.updateCreateEvent(`asset.ticketData.types[${index}].${path}`, value));
  const eventConfirmed = async () => {
    const events = await API.fetchAllEvents();
    if (events) {
      events.map(e => dispatch(Actions.addEvent(e)));
    }
    history.push(`/organizer`);
  }

  const onConfirm = async () => {
    const eventData = form.asset.eventData;
    let dateString = `${eventData.eventDate} ${eventData.eventTime}`,
      dateTimeParts = dateString.split(' '),
      timeParts = dateTimeParts[1].split(':'),
      dateParts = dateTimeParts[0].split('-')
    const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
    console.log(dateString, date, dateParts, timeParts)

    delete eventData.eventTime;
    delete eventData.eventDate;
    const assets = {
      eventData: {
        ...eventData,
        date: BigInt(Math.round(date.getTime() / 1000)),
        category: 0,
      },
      ticketData: form.asset.ticketData.types.map((t, i) => {
        // "startSellTimestamp", "id", "name", "price", "amount"
        return {
          startSellTimestamp: BigInt(Math.round(new Date().getTime() / 1000)), // todo timestamp
          id: i,
          name: t.name,
          price: BigInt(transactions.convertLSKToBeddows(t.price.toString())),
          amount: Number(t.amount),
        }
      }),
      resellData: {
        allowed: !!form.asset.resellData.allowed,
        maximumResellPercentage: Number(form.asset.resellData.maximumResellPercentage),
        resellOrganiserFee: Number(form.asset.resellData.resellOrganiserFee),
      }
    }
    const transaction = await createTransaction({
      moduleId: 1100,
      assetId: 0,
      fee: '0.01',
      assets: {
        ...assets,
      },
      passphrase: account.passphrase,
      schema: Schema.createEventSchema,
    });

    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: eventConfirmed
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: eventConfirmed
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: eventConfirmed
      }));
    }
  }
  const classes = useStyles();

  return (
    <div className="mb-20">
      <OrganiserHeader
        name="Create Event"
        balance="location"
        button1="Create new event"/>
      <div className="pb-20 bg-white">
        <div className="flex flex-row align-middle justify-center items-center ml-2 text-sm leading-4 my-4">
          <span className="text-lg font-bold justify-center">Event Information</span>
          <IconButton
            onClick={() => {
              dispatch(Actions.openModal('eventInfoModal'))
            }}
            aria-label="Close"
            color="secondary"
            className="">
            <HelpIcon/>
          </IconButton>
        </div>
        <Divider/>
        {/*START - MODALS WITH EXPLANATION */}


        {/*END - MODALS WITH EXPLANATION */}
        <form
          className="flex flex-row w-9/10 flex-wrap m-2 "
          noValidate
          autoComplete="off"
        >
          {/*START - FORM EVENTINFO */}
          {fields.map(field => <FormField {...field} onChange={updateField}
                                          variant="filled"
                                          className={classes.field}
                                          value={_.get(form, field.path)}
          />)}
          {/*START - FORM TICKET INFO  */}
          <div className="flex flex-row align-middle justify-center items-center ml-2 text-sm leading-4 my-4">
            <span className="text-lg font-bold justify-center">Ticket Information</span>
            <IconButton
              onClick={() => {
                dispatch(Actions.openModal('ticketInfoModal'))
              }}
              aria-label="Close"
              color="secondary"
              className="">
              <HelpIcon/>
            </IconButton>
          </div>
          <Divider/>


          {/*START TYPE  - TICKET TYPES */}
          {form.asset.ticketData && form.asset.ticketData.types.map((ticketType, i) => (
            <div>
              <div className="flex  ml-2 text-sm leading-4 my-4">
                <span className="text-lg">Ticket Type {i}</span>
              </div>
              {ticketTypeFields.map(field => <FormField
                key={`${field.path}-field-${i}`}
                {...field}
                id={i}
                variant="filled"
                className={classes.field}
                ticketType
                onChange={updateFieldType}
                value={_.get(form, `asset.ticketData.types[${i}].${field.path}`)}/>)}
            </div>)
          )}
          <div>
            <div className="flex  ml-2 text-sm leading-4 my-4">
            <span
              className="text-lg">Ticket Type {form.asset?.ticketData && form.asset?.ticketData?.types?.length}</span>
            </div>
            {ticketTypeFields.map(field => <FormField
              key={`${field.path}-field-${form.asset?.ticketData?.types ? form.asset?.ticketData?.types?.length : 0}`}
              {...field}
              id={form.asset?.ticketData?.types ? form.asset?.ticketData?.types?.length : 0}
              onChange={updateFieldType}
              variant="filled"
              className={classes.field}
              ticketType
              value={field.path === 'id' ? form.asset?.ticketData?.types.length : 0}/>)}
          </div>
          {/*END TYPE  - TICKET TYPES  */}

          {/*START - FORM RESELL INFO  */}
          <div className="flex flex-row align-middle justify-center items-center ml-2 text-sm leading-4 my-4">
            <span className="text-lg font-bold justify-center">Resell Information</span>
            <IconButton
              onClick={() => {
                dispatch(Actions.openModal('resellInfoModal'))
              }}
              aria-label="Close"
              color="secondary"
              className="">
              <HelpIcon/>
            </IconButton>
          </div>
          <Divider/>


          {resellFields.map(field => <FormField {...field} onChange={updateField}
                                                variant="filled"
                                                className={classes.field}
                                                value={_.get(form, field.path)}/>)}
        </form>
      </div>

      <div className="bottom-0 fixed z-50 bg-black text-white " style={{maxWidth: '450px', width: '100%', background: "#1a202c"}}>
        <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
          <div className="flex flex-row ">
            <div className="flex flex-col text-sm float-left leading-4 my-2">
              {/* TODO DIT LIVE LATEN UPDATEN & PUNTJES WERKEND KRIJGEN*/}
              {form.asset.eventData.title > MAX_LENGTH ?
                (
                  <span className="text-lg mb-2">
                      {`${form.asset.eventData.title.substring(0, MAX_LENGTH)}...`}
                    </span>
                ) :
                <span className="text-lg mb-2">{form.asset.eventData.title}</span>
              }
              {form.asset.eventData.location > MAX_LENGTH ?
                (
                  <span className="font-bold">
                      {`${form.asset.eventData.location.substring(0, MAX_LENGTH)}...`}
                    </span>
                ) :
                <span className="font-bold">{form.asset.eventData.location}</span>
              }
            </div>
          </div>
          <div className="flex flex-row content-center items-center">
            <Button
              onClick={() => {
                dispatch(Actions.openModal('confirmTxEventModal', {confirm: onConfirm}));
              }}
              variant="contained"
              size="small"
              color="secondary"
              className="">Submit Event</Button>
          </div>
        </div>
      </div>
    </div>
  );
});
