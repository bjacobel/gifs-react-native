import { ListView } from 'react-native';

import { GET_GIFS_SUCCEEDED } from '../actions/gifs';

export default (state = {}, action) => {
  let gifs;
  let newState;

  switch (action.type) {
    case GET_GIFS_SUCCEEDED:
      newState = state;
      gifs = action.payload.gifs.Contents.filter((gif) => {
        return gif.Key.slice(-4) === '.gif';
      }).map((gif) => {
        return {
          src: gif.Key,
          date: gif.LastModified,
          size: gif.Size,
          id: gif.ETag.slice(1, -1)
        };
      }).sort((x, y) => {
        if (x.date < y.date) {
          return 1;
        } else if (x.date > y.date) {
          return -1;
        }
        return 0;
      });

      if (Object.keys(newState).length === 0) {
        newState = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
      }

      if (newState instanceof ListView.DataSource) {
        newState = newState.cloneWithRows(gifs);
      }

      return newState;

    default:
      return state;
  }
};
