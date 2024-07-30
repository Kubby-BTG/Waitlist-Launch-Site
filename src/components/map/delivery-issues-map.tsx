"use client";

import FilterIssuesForm from "../modals/filter-issues-form";
import { Button } from "../ui/button";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import FilterIcon from "./filter-icon";
import { useState } from "react";
import PinIcon from "./pin-icon";
import ShowDeliveryNearYouForm from "../modals/show-delivery-near-you-form";

export default function DeliveryIssuesMap() {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);
  const [isShowShowDeliveryIssuesForm, setIsShowShowDeliveryIssues] =
    useState(false);

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
            onClick={() => setIsShowShowDeliveryIssues(true)}
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

          {/* Modals */}
          <FilterIssuesForm
            setIsOpen={setIsShowFilterForm}
            isOpen={isShowFilterForm}
          />

          <ShowDeliveryNearYouForm
            isOpen={isShowShowDeliveryIssuesForm}
            setIsOpen={setIsShowShowDeliveryIssues}
          />
        </div>
      </div>
      {/* <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/appONobAhMDlkHoh9/shreOcqx2hvnBo9cI?viewControls=on"
        frameBorder="0"
        // onMouseWheel=""
        width="100%"
        height="533"
        style={{ background: "transparent", border: "1px solid #ccc" }}
      ></iframe> */}
    </APIProvider>
  );
}

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
