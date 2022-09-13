import { useGeolocated } from "react-geolocated";

export type LatLong = {
  latitude: string;
  longitude: string;
};

export function useRequestLocation(): LatLong {
  const { coords, isGeolocationEnabled, isGeolocationAvailable } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      watchPosition: false,
    });

  return isGeolocationAvailable && isGeolocationEnabled
    ? {
        latitude: coords?.latitude.toString() ?? "",
        longitude: coords?.longitude.toString() ?? "",
      }
    : {
        latitude: "41.8788292",
        longitude: "-87.6361564",
      };
};
