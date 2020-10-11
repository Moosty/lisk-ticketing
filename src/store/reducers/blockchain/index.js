import { combineReducers } from 'redux';
import event from './event.reducer';
import basket from './basket.reducer';
import account from './account.reducer';

const blockchainReducers = combineReducers({
  event,
  basket,
  account,
});

export default blockchainReducers;
