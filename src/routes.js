import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview } from "views/Overview";
import { ModalExample } from "components/ExampleModal";
import { ExampleDrawer } from "components/ExampleDrawer";

export const Routes = (props) => {

  return (<Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/overview">
          <Overview />
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
