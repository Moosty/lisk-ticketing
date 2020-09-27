import { combineReducers } from 'redux';
import event from './event.reducer';
import basket from './basket.reducer';

const blockchainReducers = combineReducers({
  event,
  basket,
});

export default blockchainReducers;
