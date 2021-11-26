import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchPlaceReducer: ['params'],
  fetchPlaceAroundList: ['params'],
  fetchPlaceSearchList: ['params'],
  fetchPlaceDetail: ['params'],
  fetchPlaceTicketList: ['params'],
  fetchPlaceRecentList: ['params'],
<<<<<<< HEAD
  fetchPlaceReviewList: ['params'],
=======
  fetchPlaceList: ['params'],
>>>>>>> 66259663723f09e922e3062825db030bb744b59c
});

export const PlaceTypes = Types;
export default Creators;
