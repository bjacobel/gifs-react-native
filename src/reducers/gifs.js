import {
  GET_GIFS_SUCCEEDED,
  SET_ACTIVE_GIF,
} from '../actions/gifs';
import { DEFAULT_CONTAINER_HEIGHT } from '../constants';

export default (state = {}, action) => {
  const gifs = {
    list: [],
    currentlyExpanded: null,
  };

  switch (action.type) {
    case GET_GIFS_SUCCEEDED:
      gifs.list = action.payload.gifs.Contents.filter((gif) => {
        return gif.Key.slice(-4) === '.gif';
      }).map((gif) => {
        return {
          id: gif.ETag.slice(1, -1),
          src: gif.Key,
          date: gif.LastModified,
          size: gif.Size,
          height: {
            expanded: null,
            collapsed: DEFAULT_CONTAINER_HEIGHT,
            current: 'collapsed',
          },
        };
      }).sort((x, y) => {
        if (x.date < y.date) {
          return 1;
        } else if (x.date > y.date) {
          return -1;
        }
        return 0;
      });

      gifs.currentlyExpanded = null;

      return Object.assign({}, state, gifs);
    case SET_ACTIVE_GIF:
      return Object.assign({}, state, { currentlyExpanded: action.payload.id });
    default:
      return state;
  }
};
