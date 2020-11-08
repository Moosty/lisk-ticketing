import React from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import * as Actions from "../../store/actions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export const DemoModal = (props) => {
  const dispatch = useDispatch();

  return <div className="w-full flex-auto h-full bg-gray-900" style={{height: "100vh"}}>

    <div className="text-center items-center bg-gray-900 p-4 ">

      <IconButton
        onClick={() => {
          dispatch(Actions.closeModal())
        }}
        aria-label="Close"
        color="secondary"
        className="">
        <CloseIcon/>
      </IconButton>

      {/*<NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>*/}
      <div className="p-4">
        <div className="flex flex-col my-4">


          <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
            {props.title}
          </div>


          {/*  TRANSFER MODAL */}

          <div>
            <div className="flex flex-col text-left flex font-normal text-sm text-white my-2">

              <h1
                className="text-lg mt-4 font-bold">{props.subtitle}</h1>
              <div>Fill in the <span className="font-bold text-pink-400">{props.content} </span>.
              </div>
              <div className="mt-4">{props.endQuote}
              </div>

            </div>

            <div className="flex flex-col text-left flex font-normal text-sm text-white my-8">
              <h1
                className="text-sm mt-4 font-bold">Moosty Blockchain Apps</h1>
              <div className="font-normal text-sm" >Innovate together with Moosty, the lisk community & local businesses. Get in touch here.
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
            </div>
          </div>


        </div>
      </div>

    </div>
  </div>;
}
