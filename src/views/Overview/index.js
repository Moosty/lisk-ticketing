import React, {useEffect, useState} from "react";
import {Header} from "components/Header";
import {EventList} from "components/EventList";
import {useHistory} from "react-router-dom";
import * as Actions from "../../store/actions";
import {useDispatch} from "react-redux";
import {TopBar} from "components/TopBar";
import {Transition, Menu} from '@headlessui/react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";

export const Overview = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return <div className="">
    <TopBar/>
    <Header
      search={value => setSearch(value)}
      title="Explore Events"
      subtitle="An Honest Ticketing System"
      button1="Buy Tickets"
      onClick1={() => {
        dispatch(Actions.openModal('buyTicketsModal'))
      }}
      button2="Sell Tickets"
      onClick2={() => history.push("/my-tickets")}/>

    <EventList type="overview" search={search}/>

  </div>;
};
