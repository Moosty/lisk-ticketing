import { combineReducers } from 'redux';
import modals from './modals.reducer';
import drawers from './drawers.reducer';
import notifications from './notifications.reducer';

const createReducer = asyncReducers =>
  combineReducers({
    modals,
    drawers,
    notifications,
    ...asyncReducers
  });

export default createReducer;
