import type { PropsWithChildren } from "react";

export interface IReactFC<T = {}> extends React.FC<T & { children?: React.ReactNode }> {}
export interface IReactFCNoChildren<T = {}> extends React.FC<T> {}
export type IPropsWithChildren = PropsWithChildren;

interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

interface LatLng {
  lat: number;
  lng: number;
}

export interface IGoogleGeocodeResultAPI extends google.maps.GeocoderResult{}

export interface IGoogleGeocodeResult  {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    bounds: Bounds;
    location: LatLng;
    location_type: string;
    viewport: Bounds;
  };
  place_id: string;
  postcode_localities: string[];
  types: string[];
}

// https://maps.googleapis.com/maps/api/geocode/json?address=92101&key=AIzaSyCsMCSpSDnkL8mxz18R2XI_BU31cZTvjyc
