import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview } from "views/Overview";
import { ModalExample } from "components/ExampleModal";
import { ExampleDrawer } from "components/ExampleDrawer";
import { Event } from "views/Event";
import {Account} from "views/Account";
import {Checkout} from "views/Checkout";
import {Organiser} from "views/Organiser";
import {CreateEvent} from "views/CreateEvent";

import {LogIn} from "views/LogIn";

import {TopBar} from "components/TopBar";
import {Provider} from "react-redux";


export const Routes = (props) => {

  return (<Router>
    <TopBar />
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/event">
          <Event />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/organiser">
          <Organiser />
        </Route>
        <Route path="/create-event">
          <CreateEvent />
        </Route>
        <Route path="/checkout">
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
