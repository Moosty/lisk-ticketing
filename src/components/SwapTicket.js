import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  button1: {
    backgroundColor: "yellow",
  },
  month: {
    fontWeight: "bold",
    color: "#f50057",
  },

}));


export const SwapTicket = withReducer("swapTicket", reducer)(({type, price, style, eventId, ticketId}) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const thisEvent = events.find(event => event.address === eventId);

  const ticketData = thisEvent.asset.ticketData.types.find(type => type.id === ticketId );

  const [count, setCount] = useState(0);
  const classes = useStyles();

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

useEffect(()=>{
  console.log("deze:", ticketData);
}, [events]);


  return (
    <div>
      <div style={style} className="flex flex-row px-4 justify-between content-center items-center w-full ">
        <div className="flex flex-row ">

          <div className="flex flex-col text-sm float-left leading-4 my-2">

            <span className="font-bold">{type}</span>
            <span className="text-xs">$ {price}</span>
          </div>
        </div>
        <div className="flex flex-row content-center items-center flex content-center align-middle">
          <span className="text-3xl font-bold align-middle content-center" onClick={handleMinus}>-</span>
          <div className=" mx-2 border-2 rounded h-8 w-8 center  flex content-center"><span value={count}
                                                                                            className="justify-center m-auto items-baseline content-center">{count}</span></div>
          <span className="text-3xl font-bold" onClick={() => setCount(count + 1)}>+</span>


        </div>
      </div>
      <Divider/>
    </div>
  );
});
