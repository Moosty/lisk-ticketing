import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview } from "views/Overview";
import { ModalExample } from "components/ExampleModal";
import { ExampleDrawer } from "components/ExampleDrawer";
import { EventPage } from "views/EventPage";
import { Account } from "views/Account";
import { Checkout } from "views/Checkout";
import { Organizer } from "views/Organiser";
import { InLog } from "views/InLog";
import { SignUp } from "views/SignUp";
import { CreateEvent } from "views/CreateEvent";
import { TopBar } from "components/TopBar";
import { MyTickets } from "views/MyTickets";
import { OrganiserEventDetails } from "views/OrganiserEventDetails";

export const Routes = () => {
  return (<Router>
    <div>      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <InLog/>
        </Route>
        <Route path="/signup/organizer">
          <SignUp type="organizer"/>
        </Route>
        <Route path="/signup">
          <SignUp type="user"/>
        </Route>
        <Route path="/overview">
          <Overview/>
        </Route>
        <Route path="/events/organiser/:address">
          <TopBar/>
          <EventPage type="organiser"/>
        </Route>
        <Route path="/events/:address">
          <TopBar/>
          <EventPage type="user"/>
        </Route>
        <Route path="/account/:address">
          <Account/>
        </Route>
        <Route path="/my-tickets">
          <TopBar/>
          <MyTickets type='user'/>
        </Route>
        <Route path="/event-details/:id">
          <OrganiserEventDetails/>
        </Route>
        <Route path="/my-events/:address">
          <TopBar/>
          <Organizer type='organiser'/>
        </Route>
        <Route path="/organiser/:address">
          <TopBar/>
          <Organizer/>
        </Route>
        <Route path="/organizer">
          <TopBar/>
          <Organizer/>
        </Route>
        <Route path="/create-event">
          <TopBar/>
          <CreateEvent/>
        </Route>
        <Route path="/checkout">
          <TopBar/>
          <Checkout/>
        </Route>
        <Route path="/drawers">
          <ExampleDrawer/>
        </Route>
        <Route path="/modals">
          <ModalExample/>
        </Route>
        <Route path="/">
          <Overview/>
        </Route>
      </Switch>
    </div>
  </Router>);
}
