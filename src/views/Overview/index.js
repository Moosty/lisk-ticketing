import React from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/index";
import {TicketList} from "components/TicketList";
import { useHistory } from "react-router-dom";
import * as Actions from "../../store/actions";
import {useDispatch} from "react-redux";

export const Overview = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return <div className="mt-10">
    <Header
    title="An Honest Ticketing System"
    subtitle="Buy or sell your tickets"
    button1="Buy Tickets"
    onClick1={() => {
      dispatch(Actions.openModal('buyTicketsModal'))
    }}
    button2="Sell Tickets"
    onClick2={() => history.push("/my-tickets")}/>
    <TicketList type="overview" />
  </div>;
};
