import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppContext from './appContext';
import * as serviceWorker from './serviceWorker';
import { MoostyModal } from "components/Moosty";
import store from './store';
import { Routes } from "./routes";
import './styles/main.css';

ReactDOM.render(
  <AppContext.Provider value={{context: false}}>
    <Provider store={store}>
      <Routes/>
      <MoostyModal/>
    </Provider>
  </AppContext.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
