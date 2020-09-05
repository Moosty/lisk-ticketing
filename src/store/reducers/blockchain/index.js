import { combineReducers } from 'redux';
import event from './event.reducer';

const blockchainReducers = combineReducers({
  event,
});

export default blockchainReducers;
