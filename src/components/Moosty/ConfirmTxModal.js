
import React from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {useDispatch, } from "react-redux";
import * as Actions from "../../store/actions";
import TextField from "@material-ui/core/TextField";

export const ConfirmTxModal = (props) => {
  const dispatch = useDispatch();


  return <div className="text-center items-center bg-gray-900 p-4 " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col">

        {/*  CREATE EVENT MODAL */}

        { props.type === 'confirmEvent' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white" >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in the <span className="font-bold text-pink-400">organisation key </span> to confirm the creation of this event.
            </div>
            <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                       id="outlined-basic" label="Organization Passphrase" variant="filled" color="secondary" />


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
        </div> }

        {/*  CANCEL EVENT MODAL */}

        { props.type === 'confirmCancelEvent' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white" >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in the <span className="font-bold text-pink-400">organisation key </span> to confirm the cancellation of this event.
            </div>
            <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                       id="outlined-basic" label="Organization Passphrase" variant="filled" color="secondary" />


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
        </div> }

        {/*  BUY TICKETS MODAL */}

        { props.type === 'confirmBuyTickets' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white " >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in <span className="font-bold text-pink-400">your private key </span> to confirm buying the ticket(s).
            </div>
            <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                       id="outlined-basic" label="Passphrase address" variant="filled" color="secondary" />


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
        </div> }

        {/*  CONFIRM ACTION */}

        { props.type === 'confirmAction' && <div>
          <div className="flex flex-col text-left flex font-normal text-sm text-white" >

            <h1
              className="text-lg mt-4 font-bold" >Confirm this action</h1>
            <div>Fill in <span className="font-bold text-pink-400">your private key </span> to confirm.
            </div>
            <TextField style={{marginTop:"1rem", marginBottom:"1rem", borderColor:"white",backgroundColor:"white", borderRadius:"5px"}}
                       id="outlined-basic" label="Passphrase" variant="filled" color="secondary" />


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
        </div> }

      </div>
    </div>

  </div>;
}
