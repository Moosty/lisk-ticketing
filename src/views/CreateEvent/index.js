import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {OrganiserHeader} from "components/OrganiserHeader";
import {useHistory} from "react-router-dom";
import {statuses} from "../../store/reducers/blockchain/event.reducer";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import InputAdornment from "@material-ui/core/InputAdornment";


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

export const CreateEvent = withReducer("createEvent", reducer)((props) => {
  const history = useHistory();
  const form = useSelector(({blockchain}) => blockchain.event.createEvent);
  const dispatch = useDispatch();

  return <div className="mt-10 mb-20">
    <OrganiserHeader
      name="Create Event"
      balance="location"
      button1="Create new event"/>

    <div className="">
      <ul>
        <li>
          header aanpassen
        </li>
        <li className="mt-10">
          Status: wanneer begint verkoop?
        </li>
      </ul>

      <div className="flex  ml-2 text-sm leading-4 my-4">
        <span className="text-lg font-bold">Event Information</span>
      </div>

      {/*START - MODALS WITH EXPLANATION */}
      <div className="flex  ml-2 text-sm leading-4 my-4 text-red-600 "
           title="tesdfasdfasdfasdfasdfasdfasdfst"
           content="teasdfasdfasdfasdfasdfasdfasfst2"
           onClick={() => {
             dispatch(Actions.openModal('DemoModal'))
           }}>
       More Info
      </div>
      {/*END - MODALS WITH EXPLANATION */}


      <form
        className="flex flex-row w-9/10 flex-wrap m-2 "
        noValidate
        autoComplete="off"
      >
        {/*START - FORM EVENTINFO */}

        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={form.asset?.eventData?.title}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('asset.eventData.title', e.target.value));
            }

          }}
          helperText={form.asset?.eventData?.title ? `(${form.asset.eventData.title.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />
        <TextField
          id="outlined-basic"
          label="Artist"
          variant="outlined"
          value={form.asset?.eventData?.artist}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('asset.eventData.artist', e.target.value));
            }
          }}
          helperText={form.asset?.eventData?.artist ? `(${form.asset.eventData.artist.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />

        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          value={form.asset?.eventData?.location}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('asset.eventData.location', e.target.value));
            }
          }}
          helperText={form.asset?.eventData?.location ? `(${form.asset.eventData.location.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />


        <TextField
          fullWidth
          label="Start Date"
          type="datetime-local"
          variant="outlined"

          // defaultValue="2017-05-24T10:30"
          value={form.asset?.eventData?.startEvent}
          onChange={(e) => {
            dispatch(Actions.updateCreateEvent('asset.eventData.startEvent', new Date(e.target.value)));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-basic"
          label="duration event"
          variant="outlined"
          type="number"
          value={form.asset?.resellData?.duration}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('duration', {
                goal: parseInt(e.target.value, 10),
              }));
            }
          }}
          fullWidth
          style={{marginBottom: 12}}

        />






        {/*START - FORM TICKET INFO  */}


        <div className="flex  ml-2 text-sm leading-4 my-4">
          <span className="text-lg font-bold">Ticket Information</span>
        </div>

        <div className="flex  ml-2 text-sm leading-4 my-4">
          <span className="text-lg">Ticket Type 1</span>
        </div>

        <TextField
          id="outlined-basic"
          label="type of ticket (name)"
          variant="outlined"
          value={form.asset?.ticketData?.types?.name}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('name', e.target.value));
            }
          }}
          helperText={form.name ? `(${form.name.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />

        <TextField
          fullWidth
          label="Start Sell"
          type="datetime-local"
          variant="outlined"

          // defaultValue="2017-05-24T10:30"
          value={form.asset?.ticketData?.types?.startSell}
          onChange={(e) => {
            dispatch(Actions.updateCreateEvent('startSell', {startSell: e.target.value}));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />



        <TextField
          id="outlined-basic"
          label="price of tickets"
          variant="outlined"
          type="number"
          value={form.asset?.ticketData?.types?.price}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('price', {
                goal: parseInt(e.target.value, 20),
              }));
            }
          }}
          helperText={form.price ? `(${form.price.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          id="outlined-start-adornment"
        />

        <TextField
          id="outlined-basic"
          label="amount of tickets"
          variant="outlined"
          type="number"
          value={form.asset?.ticketData?.types?.amount}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('amount', {
                goal: parseInt(e.target.value, 20),
              }));
            }
          }}
          helperText={form.amount ? `(${form.amount.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />







        {/*START - FORM RESELL INFO  */}


        <div className="flex  ml-2 text-sm leading-4 my-4">
          <span className="text-lg font-bold">Resell Information</span>
        </div>

        <TextField
          id="outlined-select-currency"
          select
          label="can I resell my ticket?"
          value={form.asset?.resellData?.allowed}
          onChange={(e) =>
            dispatch(Actions.updateCreateEvent('allowed', {category: e.target.value}))
          }
          helperText="Please select your category"
          variant="outlined"
          fullWidth
          style={{marginBottom: 12}}
        >
          {categories.map((option) => (
            <div className="text-lg text-center" key={option.value} value={option.value}>
              {option.label}
            </div>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="maximumResellPercentage"
          variant="outlined"
          type="number"
          value={form.asset?.resellData?.maximumResellPercentage}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('maximumResellPercentage', {
                goal: parseInt(e.target.value, 20),
              }));
            }
          }}
          helperText={form.maximumResellPercentage ? `(${form.maximumResellPercentage.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          id="outlined-end-adornment"
        />
        <TextField
          id="outlined-basic"
          label="resellOrganiserFee"
          variant="outlined"
          type="number"
          value={form.asset?.resellData?.resellOrganiserFee}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('resellOrganiserFee', {
                goal: parseInt(e.target.value, 10),
              }));
            }
          }}
          fullWidth
          style={{marginBottom: 12}}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          id="outlined-end-adornment"
        />

        <div className="flex  ml-2 text-sm leading-4 my-4">
          <span className="text-lg font-bold">Temporary</span>
        </div>
        <TextField
          id="outlined-basic"
          label="address"
          variant="outlined"
          value={form.address}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('address', e.target.value));
            }
          }}
          helperText={form.address ? `(${form.address.length}/50)` : `(0/50)`}
          fullWidth
          style={{marginBottom: 12}}
        />
      </form>

    </div>

    <div className="bottom-0 fixed z-50 bg-black text-white w-full ">
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <span className="text-lg mb-2">Event</span>
            <span className="font-bold">...</span>


          </div>
        </div>

        <div className="flex flex-row content-center items-center">
          <Button
            // multiline gemaakt door toevoeging { } na de =>
            onClick={() => {
              console.log({form})
              history.push(`/organiser`);
              dispatch(Actions.addEvent(form));
            }}
            variant="contained"
            size="small"
            color="secondary"
            className="">Submit Event</Button>
        </div>
      </div>
      <Divider/>
    </div>
  </div>
    ;
});
