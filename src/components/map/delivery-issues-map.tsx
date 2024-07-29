"use client";

import FilterIssuesForm from "../modals/filter-issues-form";
import { Button } from "../ui/button";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import FilterIcon from "./filter-icon";
import { useState } from "react";

export default function DeliveryIssuesMap() {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);

  return (
    <APIProvider
      apiKey={"AIzaSyCsMCSpSDnkL8mxz18R2XI_BU31cZTvjyc"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div
        className={
          "relative h-[600px] w-full overflow-hidden md:h-[640px] md:rounded-2xl"
        }
      >
        {/* <iframe
          // width="450"
          // height="250"
          className={"h-full w-full"}
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCsMCSpSDnkL8mxz18R2XI_BU31cZTvjyc&q=Eiffel+Tower,Paris+France"
          allowFullScreen
        /> */}

        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          disableDefaultUI
          //   onCameraChanged={ (ev: MapCameraChangedEvent) =>
          //     console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          //   }
        ></Map>

        <div className="absolute left-6 top-8 flex flex-wrap gap-2 md:gap-4">
          <Button
            className={
              "gap-1 rounded-full bg-background-icon text-sm font-normal hover:bg-background-icon/80"
            }
            size={"sm"}
          >
            <PinIcon />
            Show delivery issues near you
          </Button>
          <Button
            className={
              "gap-1 rounded-full bg-background-icon text-sm font-normal hover:bg-background-icon/80"
            }
            size={"sm"}
            onClick={() => setIsShowFilterForm(true)}
          >
            <FilterIcon />
            Filter issues
          </Button>
          {/* {!isShowFilterForm && ( */}
          <FilterIssuesForm
            setIsOpen={setIsShowFilterForm}
            isOpen={isShowFilterForm}
          />
          {/* )} */}
        </div>
      </div>
    </APIProvider>
  );
}

const PinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2.00033C6.76232 2.00033 5.57534 2.49199 4.70017 3.36716C3.825 4.24233 3.33333 5.42932 3.33333 6.66699C3.33333 8.40364 4.51365 10.2414 5.83161 11.7241C6.47495 12.4478 7.12036 13.0531 7.60567 13.4778C7.75412 13.6077 7.88715 13.7203 8 13.8138C8.11285 13.7203 8.24588 13.6077 8.39433 13.4778C8.87964 13.0531 9.52505 12.4478 10.1684 11.7241C11.4864 10.2414 12.6667 8.40364 12.6667 6.66699C12.6667 5.42932 12.175 4.24233 11.2998 3.36716C10.4247 2.49199 9.23768 2.00033 8 2.00033ZM8 14.667C7.6 15.2003 7.59985 15.2002 7.59969 15.2001L7.59925 15.1998L7.59802 15.1988L7.59411 15.1959L7.58061 15.1856C7.56912 15.1769 7.55272 15.1643 7.53172 15.148C7.48974 15.1155 7.42937 15.0682 7.35324 15.007C7.20103 14.8847 6.98548 14.7068 6.72766 14.4812C6.21297 14.0309 5.52505 13.3861 4.83506 12.6099C3.48635 11.0926 2 8.93034 2 6.66699C2 5.07569 2.63214 3.54957 3.75736 2.42435C4.88258 1.29913 6.4087 0.666992 8 0.666992C9.5913 0.666992 11.1174 1.29913 12.2426 2.42435C13.3679 3.54957 14 5.07569 14 6.66699C14 8.93034 12.5136 11.0926 11.1649 12.6099C10.4749 13.3861 9.78703 14.0309 9.27234 14.4812C9.01452 14.7068 8.79897 14.8847 8.64676 15.007C8.57063 15.0682 8.51026 15.1155 8.46828 15.148C8.44728 15.1643 8.43088 15.1769 8.41939 15.1856L8.40589 15.1959L8.40198 15.1988L8.40074 15.1998L8.40031 15.2001C8.40015 15.2002 8.4 15.2003 8 14.667ZM8 14.667L8.4 15.2003C8.16296 15.3781 7.83704 15.3781 7.6 15.2003L8 14.667Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.00001 5.33333C7.26363 5.33333 6.66668 5.93029 6.66668 6.66667C6.66668 7.40305 7.26363 8 8.00001 8C8.73639 8 9.33334 7.40305 9.33334 6.66667C9.33334 5.93029 8.73639 5.33333 8.00001 5.33333ZM5.33334 6.66667C5.33334 5.19391 6.52725 4 8.00001 4C9.47277 4 10.6667 5.19391 10.6667 6.66667C10.6667 8.13943 9.47277 9.33333 8.00001 9.33333C6.52725 9.33333 5.33334 8.13943 5.33334 6.66667Z"
      fill="white"
    />
  </svg>
);

const mapStyles = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        hue: "#0066ff",
      },
      {
        saturation: 74,
      },
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        weight: 0.6,
      },
      {
        saturation: -85,
      },
      {
        lightness: 61,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#5f94ff",
      },
      {
        lightness: 26,
      },
      {
        gamma: 5.86,
      },
    ],
  },
];
