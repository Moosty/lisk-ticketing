import { combineReducers } from 'redux';
import modals from './modals.reducer';
import drawers from './drawers.reducer';
import notifications from './notifications.reducer';
import blockchain from "./blockchain";

const createReducer = asyncReducers =>
  combineReducers({
    blockchain,
    modals,
    drawers,
    notifications,
    ...asyncReducers
  });

export default createReducer;
