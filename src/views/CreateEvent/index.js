import React, {useEffect, useState} from "react";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {OrganiserHeader} from "components/OrganiserHeader";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import {FormField} from "components/FormField";
import {TopBar} from "components/TopBar";
import HelpIcon from '@material-ui/icons/Help';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
  {label: "Artist", path: "asset.eventData.artist", type: "text", limit: 50},
  {label: "Location", path: "asset.eventData.location", type: "text", limit: 50},
  {label: "Event date", path: "asset.eventData.date", type: "date"},
  {label: "Start Time", path: "asset.eventData.eventTime", type: "time"},
  {label: "Duration event", path: "asset.eventData.duration", type: "number"},
  {label: "Category", path: "asset.eventData.category", type: "text"},
  {label: "Site", path: "asset.eventData.site", type: "text"},
  {label: "Image", path: "asset.eventData.image", type: "text"},
];

const ticketTypeFields = [
  {label: "ID", path: "id", type: "number", disabled: true},
  {label: "Start date selling", path: "startSellDate", type: "date"},
  {label: "Start time selling", path: "startSellTime", type: "time"},
  {label: "Price", path: "price", type: "text"},
  {label: "Amount available", path: "amount", type: "number"},
];

const resellFields = [
  {label: "Can buyers resell your tickets", path: "asset.resellData.allowed", type: "checkbox"},
  {label: "Max resell percentage", path: "asset.resellData.maximumResellPercentage", type: "number"},
  {label: "Resell fee percentage", path: "asset.resellData.resellOrganiserFee", type: "number"},
];

const tempFields = [
  {label: "Address", path: "address", type: "text"},
];

export const CreateEvent = withReducer("createEvent", reducer)((props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const MAX_LENGTH = 15;
  const event = useSelector(({blockchain}) => blockchain.event);
  const [form, setForm] = useState(event.createEvent);

  useEffect(() => {
    setForm(event.createEvent);
    // console.log(form);
  }, [event])

  const updateField = (path, value) => dispatch(Actions.updateCreateEvent(path, value));
  const updateFieldType = (path, index, value) => dispatch(Actions.updateCreateEvent(`asset.ticketData.types[${index}].${path}`, value));

  return (
    <div>
      <TopBar/>

      <div className="mt-10 mb-20">
        <OrganiserHeader
          name="Create Event"
          balance="location"
          button1="Create new event"/>
        <div className="">
          <div className="flex flex-row align-middle  ml-2 text-sm leading-4 my-4">
            <span className="text-lg font-bold">Event Information</span>
            <IconButton
              onClick={() => {
                dispatch(Actions.openModal('eventInfoModal'))}}
              aria-label="Close"
              color="secondary"
              className="">
              <HelpIcon/>
            </IconButton>
          </div>
          {/*START - MODALS WITH EXPLANATION */}



          {/*END - MODALS WITH EXPLANATION */}
          <form
            className="flex flex-row w-9/10 flex-wrap m-2 "
            noValidate
            autoComplete="off"
          >
            {/*START - FORM EVENTINFO */}
            {fields.map(field => <FormField {...field} onChange={updateField} value={_.get(form, field.path)}/>)}
            {/*START - FORM TICKET INFO  */}
            <div className="flex  ml-2 text-sm leading-4 my-4">
              <span className="text-lg font-bold">Ticket Information</span>
              <IconButton
                onClick={() => {
                  dispatch(Actions.openModal('ticketInfoModal'))}}
                aria-label="Close"
                color="secondary"
                className="">
                <HelpIcon/>
              </IconButton>
            </div>


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
                ticketType
                value={field.path === 'id' ? form.asset?.ticketData?.types ? form.asset?.ticketData?.types.length : 0 : ""}/>)}
            </div>
            {/*END TYPE  - TICKET TYPES  */}

            {/*START - FORM RESELL INFO  */}
            <div className="flex  ml-2 text-sm leading-4 my-4">
              <span className="text-lg font-bold">Resell Information</span>
              <IconButton
                onClick={() => {
                  dispatch(Actions.openModal('resellInfoModal'))}}
                aria-label="Close"
                color="secondary"
                className="">
                <HelpIcon/>
              </IconButton>
            </div>


            {resellFields.map(field => <FormField {...field} onChange={updateField} value={_.get(form, field.path)}/>)}
            <div className="flex  ml-2 text-sm leading-4 my-4">
              <span className="text-lg font-bold">Temporary</span>
            </div>
            {tempFields.map(field => <FormField {...field} onChange={updateField} value={_.get(form, field.path)}/>)}

          </form>

        </div>

        <div className="bottom-0 fixed z-50 bg-black text-white w-full ">
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
                  dispatch(Actions.openModal('confirmTxEventModal'));
                }}
                // onClick={() => {
                //   console.log({form})
                //   history.push(`/organiser/organiser01`);
                //   dispatch(Actions.addEvent(form));
                // }}

                variant="contained"
                size="small"
                color="secondary"
                className="">Submit Event</Button>
            </div>
          </div>
          <Divider/>
        </div>
      </div>
    </div>
  );
});
