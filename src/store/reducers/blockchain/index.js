import { combineReducers } from 'redux';
import event from './event.reducer';
import basket from './basket.reducer';
import account from './account.reducer';
import marketplace from './marketplace.reducer';
import portfolio from './portfolio.reducer';
import organiser from './organiser.reducer';

const blockchainReducers = combineReducers({
  event,
  basket,
  account,
  portfolio,
  marketplace,
  organiser,
});

export default blockchainReducers;
