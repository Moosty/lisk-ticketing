import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview } from "views/Overview";
import { ModalExample } from "components/ExampleModal";
import { ExampleDrawer } from "components/ExampleDrawer";
import { EventPage } from "views/EventPage";
import {Account} from "views/Account";
import {Checkout} from "views/Checkout";
import {Organiser} from "views/Organiser";

import {InLog} from "views/InLog";
import {SignUp} from "views/SignUp";

import {CreateEvent} from "views/CreateEvent";
import {TopBar} from "components/TopBar";
import {MyTickets} from "views/MyTickets";


export const Routes = (props) => {

  return (<Router>
    <TopBar />
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <InLog />
        </Route>
        <Route path="/signup/organiser">
          <SignUp type="organiser" />
        </Route>
        <Route path="/signup">
          <SignUp type="user" />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/events/organiser/:address">
          <EventPage type="organiser" />
        </Route>
        <Route path="/events/:address">
          <EventPage type="user" />
        </Route>
        <Route path="/account/:address">
          <Account />
        </Route>


        <Route path="/my-tickets/:account">
          <MyTickets type='user' />
        </Route>
        <Route path="/my-events/:address">
          <MyTickets type='organiser' />
        </Route>
        <Route path="/organiser/:address">
          <Organiser />
        </Route>
        <Route path="/organiser">
          <Organiser />
        </Route>
        <Route path="/create-event">
          <CreateEvent />
        </Route>
        <Route path="/checkout/:ownerId">
        <Checkout />
      </Route>
        <Route path="/drawers">
          <ExampleDrawer />
        </Route>
        <Route path="/modals">
          <ModalExample />
        </Route>
      </Switch>
    </div>
  </Router>);
}
