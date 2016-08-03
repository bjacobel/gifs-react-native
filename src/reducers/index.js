import { combineReducers } from 'redux';

import gifs from './gifs';
import tags from './tags';

export default combineReducers({
  gifs,
  tags
});
