import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';
import * as Actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {ImportContacts} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import CropFreeTwoToneIcon from "@material-ui/icons/CropFreeTwoTone";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color:"#f50057",
  },

}));

export const EventBottom = ({props}) => {
  const basket = useSelector(({blockchain}) => blockchain.basket.items);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState();

  useEffect( () => {
      console.log(basket);
      console.log(basket.length);
      setTotalPrice(basket.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      ));
    }, [basket]
  );

  useEffect( () => {
      console.log(JSON.stringify(totalPrice));
    }, [totalPrice]
  );
  return (
    <div className="bottom-0 fixed z-50 bg-gray-900 text-white w-full ">
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">
            <Button
              onClick={()=> dispatch(Actions.openModal('cancelEventModal'))}
              variant="outlined"
              size="small"
              color="secondary"
            >Cancel Event</Button>

          </div>
        </div>

        <div className="flex flex-row content-center items-center">

    <IconButton >
      <CropFreeTwoToneIcon color="secondary"/>
    </IconButton>

        </div>
      </div>
      <Divider />
    </div>
  );
};
