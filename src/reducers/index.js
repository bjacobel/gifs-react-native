import { combineReducers } from 'redux';

import gifs from './gifs';
import tags from './tags';
import currentlyExpanded from './currentlyExpanded';

export default combineReducers({
  currentlyExpanded,
  gifs,
  tags,
});
