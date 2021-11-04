import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchPlaceReducer: ['params'],
  fetchPlaceAroundList: ['params'],
  fetchPlaceSearchList: ['params'],
});

export const PlaceTypes = Types;
export default Creators;
