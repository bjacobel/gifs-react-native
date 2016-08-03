import {
  GET_GIFS_SUCCEEDED,
  SET_GIF_ACTIVE
} from '../actions/gifs';
import { DEFAULT_CONTAINER_HEIGHT } from '../constants';

export default (state = {}, action) => {
  const gifs = {};

  switch (action.type) {
    case GET_GIFS_SUCCEEDED:
      action.payload.gifs.Contents.filter((gif) => {
        return gif.Key.slice(-4) === '.gif';
      }).forEach((gif) => {
        gifs[gif.ETag.slice(1, -1)] = {
          src: gif.Key,
          date: gif.LastModified,
          size: gif.Size,
          height: {
            expanded: null,
            collapsed: DEFAULT_CONTAINER_HEIGHT,
            current: 'collapsed'
          }
        };
      });

      return gifs;
    case SET_GIF_ACTIVE:
      return Object.assign({}, state, {
        [action.payload.id]: {
          height: {
            current: state[action.payload.id].height.current === 'expanded' ? 'current' : 'expanded'
          }
        }
      });
    default:
      return state;
  }
};
