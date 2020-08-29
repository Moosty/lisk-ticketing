import React from "react";
import {TicketListItem} from "components/index";

export const TicketList = (props) => {
  return <div>

    <TicketListItem
      artist="Racoon"
      location="Caprera Openluchttheater - Bloemendaal"
      time="Za 19:30"
      day="18"
      month="apr"/>
    <TicketListItem
      artist="TrafficLight"
      location="Metropool - Hengelo OV"
      time="Za 19:30"
      day="18"
      month="apr"/><TicketListItem
    artist="Racoon"
    location="Caprera Openluchttheater - Bloemendaal"
    time="za 18.00"
    day="24"
    month="jul"/>
    <TicketListItem
      artist="Indian Askin"
      location="Melkweg - Amsterdam"
      time="za 20.00"
      day="02"
      month="jan"/>

  </div>;
};
