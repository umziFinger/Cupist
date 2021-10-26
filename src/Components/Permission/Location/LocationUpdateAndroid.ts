import Geolocation from 'react-native-geolocation-service';

export default async function () {
  const result = await getLocationPromise();
  return result;
}
const getLocationPromise = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const position = {
          myLatitude: pos.coords.latitude,
          myLongitude: pos.coords.longitude,
        };
        resolve(position);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  });
};
