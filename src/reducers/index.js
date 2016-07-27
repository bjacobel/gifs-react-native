import { combineReducers } from 'redux';

import currentlyExpanded from './currentlyExpanded';
import gifs from './gifs';
import tags from './tags';

export default combineReducers({
  currentlyExpanded,
  gifs,
  tags
});
