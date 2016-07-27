import {
  SET_ACTIVE_GIF
} from '../actions/gifs';

export default (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_GIF:
      return action.payload.id;
    default:
      return state;
  }
};
