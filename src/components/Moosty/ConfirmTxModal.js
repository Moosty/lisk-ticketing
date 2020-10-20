import React from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Actions from "../../store/actions";

export const ConfirmTxModal = (props) => {

  return <div className="text-center items-center bg-gray-900  " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">
        <div className=" flex justify-center items-baseline flex1 ">
          <NotificationsRoundedIcon style={{color: '#ed8936', fontSize: 30}}/>
        </div>
        <div className="text-center flex1 text-2xl text-gray-900 font-bold uppercase max-w-2xl">
          {props.title}
        </div>
        <div className="text-left flex font-normal text-sm text-gray-900">
          {props.content}
        </div>

        <TextField
          className="bg-white rounded"
          id="outlined-basic"
          label="confirm transaction"
          // Standaard "outlined" tenzij een "variant" prop is meegegeven
          variant="outlined"
          fullWidth
          style={{marginBottom: 12}}
        />

        <button className="mt-4 px-8 p-2 bg-gray-900 bg-opacity-25 hover:bg-opacity-50 text-white rounded-full">Cancel
        </button>

        {/*// TODO dit werkend maken*/}
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    console.log({form})*/}
        {/*    history.push(`/organiser/organiser01`);*/}
        {/*    dispatch(Actions.addEvent(form));*/}
        {/*  }}*/}
        {/*  variant="contained"*/}
        {/*  size="small"*/}
        {/*  color="secondary"*/}
        {/*  className="">Submit Event</Button>*/}

      </div>
    </div>

  </div>;
}
