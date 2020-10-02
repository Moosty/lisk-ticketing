import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {SignUpUser} from "components/SignUpUser";
import {SignUpOrg} from "components/SignUpOrg";


export const SignUp = (props) => {
  return <div className="mt-10">
  <SignUpUser />
   <SignUpOrg />
  
  </div>;



};
