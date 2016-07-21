import * as s3 from '../services/s3';

export const GET_GIFS_REQUESTED = 'GET_GIFS_REQUESTED';
export const GET_GIFS_FAILED = 'GET_GIFS_FAILED';
export const GET_GIFS_SUCCEEDED = 'GET_GIFS_SUCCEEDED';

function getGifsRequested() {
  return { type: GET_GIFS_REQUESTED };
}

function getGifsSucceeded(gifs) {
  return { type: GET_GIFS_SUCCEEDED, payload: { gifs } };
}

function getGifsFailed(err) {
  console.trace(err);
  return { type: GET_GIFS_FAILED, payload: { err }, error: true };
}

export function getGifsAsync() {
  return (dispatch) => {
    dispatch(getGifsRequested());

    return s3.getBucketContents()
      .then((gifs) => {
        dispatch(getGifsSucceeded(gifs));
      })
      .catch((err) => {
        dispatch(getGifsFailed(err));
      });
  };
}
