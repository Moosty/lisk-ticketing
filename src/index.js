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
      <div className="fixed bottom-0 top-0 left-0 right-0 w-full h-full bg-gray-400 overflow-y-auto">
      <div className="bg-white bottom-0 top-0" style={{with: '100%', maxWidth: '450px'}}>
        <Routes/>
        <MoostyModal/>
      </div>
      </div>
    </Provider>
  </AppContext.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
