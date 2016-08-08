import { SET_ACTIVE_GIF } from '../actions/gifs';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_GIF:
      return Object.assign({}, state, { id: action.payload.id });
    default:
      return state;
  }
};
