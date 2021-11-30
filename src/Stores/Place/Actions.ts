import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchPlaceReducer: ['params'],
  fetchPlaceAroundList: ['params'],
  fetchPlaceSearchList: ['params'],
  fetchPlaceDetail: ['params'],
  fetchPlaceTicketList: ['params'],
  fetchPlaceRecentList: ['params'],
  fetchPlaceReviewList: ['params'],
  fetchPlaceList: ['params'],
  fetchPlaceHotList: ['params'],
  fetchPlaceDibsList: ['params'],
});

export const PlaceTypes = Types;
export default Creators;
