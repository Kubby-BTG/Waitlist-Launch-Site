import type { IGoogleGeocodeResult } from "../types";
import { AppConfig } from "./constants";

const GEOCODE_BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json`;

type IGeocodeLocality = { city: string; state: string };

class GoogleMapServiceBase {
  async getGeocodeAddressByZipcode(zipcode: string) {
    const apiKey = AppConfig.NEXT_PUBLIC_GOOGLE_MAP_KEY;

    const url = `${GEOCODE_BASE_URL}?address=${zipcode}&key=${apiKey}`;

    const request = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!request.ok) {
      throw new Error("Error occured while geocoding");
    }

    const results01 = (await request.json()) as { results: IGoogleGeocodeResult[]; status: "OK" };

    if (results01?.status !== "OK") {
      return [];
    }
    return results01.results;
  }

  getFirtstLocation(results: IGoogleGeocodeResult[]) {
    if (!results?.length) {
      return null;
    }

    // if (typeof results[0]?.geometry?.location?.lat === "function") {
    //   return {
    //     lat: results[0].geometry.location.lat(),
    //     lng: results[0].geometry.location.lng(),
    //   };
    // }

    return {
      lat: results[0].geometry.location.lat,
      lng: results[0].geometry.location.lng,
    };
  }

  geocodeResponseToCityState(results: IGoogleGeocodeResult[]) {
    const parsedLocalities: IGeocodeLocality[] = [];
    if (results?.length) {
      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        const locality = {} as IGeocodeLocality;
        for (let j = 0; j < result.address_components.length; j++) {
          const types = result.address_components[j].types;
          for (let k = 0; k < types.length; k++) {
            if (types[k] === "locality") {
              locality.city = result.address_components[j].long_name;
            } else if (types[k] === "administrative_area_level_1") {
              locality.state = result.address_components[j].short_name;
            }
          }
        }

        parsedLocalities.push(locality);

        //check for additional cities within this zip code
        if (result.postcode_localities) {
          for (var l = 0; l < result.postcode_localities.length; l++) {
            parsedLocalities.push({ city: result.postcode_localities[l], state: locality.state });
          }
        }
      }
    } else {
      console.log("error: no address components found");
    }
    return parsedLocalities;
  }
}

export const GoogleMapService = new GoogleMapServiceBase();
