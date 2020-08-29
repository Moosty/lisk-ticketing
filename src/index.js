import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppContext from './appContext';
import * as serviceWorker from './serviceWorker';
import { MoostyModal } from "./components/Moosty";
import store from './store';
import { Routes } from "./routes";
import './styles/main.css';
import {TopBar} from "components/TopBar";


ReactDOM.render(
  <AppContext.Provider
    value={{
      context: false
    }}
  >
    <Provider store={store}>
      <TopBar />
      <Routes/>
      <MoostyModal/>
    </Provider>
  </AppContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
