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
        <li>
          input velden toevoegen
        </li>
        <li className="mt-2">
          Event Title
        </li>
        <li>
          Locatie
        </li>
        <li>
          Artiest
        </li>
        <li>
          Starttijd
        </li>
        <li>
          Eindtijd
        </li>
        <li>
          Tickets (soort tickets)
        </li>
        <li>
          Resell opties: ja/nee && percentage resell && percentage organiser
        </li>
        <li className="mt-10">
          Status: wanneer begint verkoop?
        </li>
      </ul>

      <form
        className="flex flex-row w-9/10 flex-wrap m-2 "
        noValidate
        autoComplete="off"
      >
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


        <TextField
          id="outlined-basic"
          label="start event"
          variant="outlined"
          value={form.asset?.eventData?.startEvent}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              dispatch(Actions.updateCreateEvent('asset.eventData.startEvent', new Date(e.target.value)));
            }
          }}
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
