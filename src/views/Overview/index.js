import React from "react";
import {Header} from "components/Header";
import {EventList} from "components/EventList";
import { useHistory } from "react-router-dom";
import * as Actions from "../../store/actions";
import {useDispatch} from "react-redux";

export const Overview = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return <div className="mt-10">
    <Header
    title="Explore Tickets"
    subtitle="An Honest Ticketing System"
    button1="Buy Tickets"
    onClick1={() => {
      dispatch(Actions.openModal('buyTicketsModal'))
    }}
    button2="Sell Tickets"
    onClick2={() => history.push("/my-tickets")}/>

    <EventList type="overview" />
  </div>;
};
