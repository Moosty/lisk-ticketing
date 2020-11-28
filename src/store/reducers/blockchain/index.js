import { combineReducers } from 'redux';
import event from './event.reducer';
import basket from './basket.reducer';
import account from './account.reducer';
import marketplace from './marketplace.reducer';
import portfolio from './portfolio.reducer';
import organizer from './organiser.reducer';
import transactions from './transactions.reducer';
import blocks from './blocks.reducer';
import market from './marketplace.reducer';

const blockchainReducers = combineReducers({
  event,
  basket,
  account,
  portfolio,
  marketplace,
  organizer,
  transactions,
  blocks,
  market,
});

export default blockchainReducers;
