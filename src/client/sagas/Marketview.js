import { takeLatest, call, put } from 'redux-saga/effects';

import { types, actions } from 'Reducers/Marketview';
import { getCompetitorTopVideos } from 'Api/Marketview';

function* getCompetitorTopVideosMarketview() {
  console.log('top videos request saga');
  try{
    const payload = yield call(getCompetitorTopVideos);
    yield put(actions.getCompetitorTopVideosSuccess(payload));
  }catch(e) {
    yield put(actions.getCompetitorTopVideosFailure({ e }));
  }
}

export default [takeLatest(types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideosMarketview)];