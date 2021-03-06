import { GET_GIFS_SUCCEEDED } from '../actions/gifs';

export default (state = [], action) => {
  switch (action.type) {
    case GET_GIFS_SUCCEEDED:
      return action.payload.gifs.Contents.filter((gif) => {
        return gif.Key.slice(-4) === '.gif';
      }).map((gif) => {
        return {
          id: `${gif.ETag.slice(1, -1)}-${gif.Key}`,
          src: gif.Key,
          date: gif.LastModified,
          size: gif.Size,
        };
      }).sort((x, y) => {
        if (x.date < y.date) {
          return 1;
        } else if (x.date > y.date) {
          return -1;
        }
        return 0;
      });
    default:
      return state;
  }
};
