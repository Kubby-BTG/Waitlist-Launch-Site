"use client";

import FilterIssuesForm, { IFilterIssueParams } from "../modals/filter-issues-form";
import { Button } from "../ui/button";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import FilterIcon from "./filter-icon";
import { useEffect, useState } from "react";
import PinIcon from "./pin-icon";
import ShowDeliveryNearYouForm from "../modals/show-delivery-near-you-form";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { AppConfig } from "../../utils/constants";
import useAppFormPost from "@/hooks/useAppFormPost";
import { IDeliveryIssue } from "../../airtable/types";
import AppAlertDialog, { useAppAlertDialog } from "../ui/AppAlertDialog";

export default function DeliveryIssuesMap() {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);
  const [isShowShowDeliveryIssuesForm, setIsShowShowDeliveryIssues] = useState(false);
  const [deliveryIssue, setDeliveryIssue] = useState({ count: 0, location: "" });
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();
  const { postData, isBusy } = useAppFormPost();

  useEffect(() => {
    getAllDeliveryIssues().catch(() => {});
  }, []);

  async function handleFindByManyParams(params: Partial<IFilterIssueParams>) {
    try {
      const filter01: string[] = [];

      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (key && val) {
            if (typeof val === "string") {
              filter01.push(`{${key}}="${val}"`);
            } else {
              filter01.push(`{${key}}=${val}`);
            }
          }
        });
      }

      if (!filter01?.length) {
        return;
      }

      const apiData = await postData<IDeliveryIssue[]>({
        url: "/api/delivery-issue/find",
        formData: { filterByFormula: `AND(${filter01.join(",")})` },
      });

      openAlertDialog.info({
        title: `${apiData.length} issue(s) found`,
        description: apiData.length ? "Note: Map location mark not implimented yet" : undefined,
      });

      setIsShowFilterForm(false);
    } catch (error) {
      openAlertDialog.error({ title: "Could not filter. Error occured" });
    }
  }

  async function getAllDeliveryIssues() {
    try {
      const apiData = await postData<IDeliveryIssue[]>({
        url: "/api/delivery-issue/find",
        formData: {},
      });

      if (apiData?.length) {
        setDeliveryIssue({ count: apiData.length, location: "Unknown Location" });
      } else {
        setDeliveryIssue({ count: 0, location: "" });
      }
    } catch (error) {
      openAlertDialog.error({ title: "Could not filter. Error occured" });
    }
  }

  async function handleFindByZipcode(zipcode: string) {
    try {
      const apiData = await postData<IDeliveryIssue[]>({
        url: "/api/delivery-issue/find",
        formData: { filterByFormula: `{zipcode}="${zipcode}"` },
      });

      if (apiData?.length) {
        setDeliveryIssue({ count: apiData.length, location: "Unknown Location" });
      } else {
        setDeliveryIssue({ count: 0, location: "" });
      }

      openAlertDialog.info({ title: `${apiData.length} issue(s) found` });

      setIsShowShowDeliveryIssues(false);
    } catch (error) {
      openAlertDialog.error({ title: "Error occured. Could not filter" });
    }
  }

  return (
    <APIProvider apiKey={AppConfig.NEXT_PUBLIC_GOOGLE_MAP_KEY} onLoad={() => console.log("Maps API has loaded.")}>
      <div className={"relative h-[600px] w-full overflow-hidden md:h-[640px] md:rounded-2xl"}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          disableDefaultUI={true}
          mapId={"19cefe5f097a79a6"}
          //   onCameraChanged={ (ev: MapCameraChangedEvent) =>
          //     console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          //   }
        >
          {deliveryIssue.count ? (
            <>
              <AdvancedMarker
                position={{ lat: -33.860664, lng: 151.208138 }}
                // ref={marker => setMarkerRef(marker, poi.key)}
              >
                <HoverCard open={true}>
                  <HoverCardTrigger>
                    <img src={"/markers/cube.svg"} alt="" className={"size-8"} />
                  </HoverCardTrigger>
                  <HoverCardContent
                    side={"top"}
                    sideOffset={12}
                    forceMount={true}
                    className="flex h-fit w-fit flex-col items-center gap-2 rounded-lg border-none bg-black px-3 py-3 font-sans text-white"
                  >
                    <div className="absolute bottom-0 translate-y-[80%]">
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.73649 7.96115C7.9687 9.30478 6.0313 9.30478 5.26351 7.96115L0.709874 -0.00772253C-0.0520192 -1.34104 0.910715 -3 2.44636 -3L11.5536 -3C13.0893 -3 14.052 -1.34103 13.2901 -0.0077215L8.73649 7.96115Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="text-sm">
                      <span className="font-bold">{deliveryIssue.count}</span> - Delivery Issues
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-[#2F3233] px-2 py-1 text-sm text-white">
                      <PinIcon />
                      <span>{deliveryIssue.location}</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </AdvancedMarker>
            </>
          ) : null}
        </Map>

        <div className="absolute left-6 top-8 flex flex-wrap gap-2 md:gap-4">
          <Button
            className={"gap-1 rounded-full bg-background-icon text-sm font-normal hover:bg-background-icon/80"}
            size={"sm"}
            onClick={() => setIsShowShowDeliveryIssues(true)}
            disabled={isBusy}
          >
            <PinIcon />
            Show delivery issues near you
          </Button>

          <Button
            className={"gap-1 rounded-full bg-background-icon text-sm font-normal hover:bg-background-icon/80"}
            size={"sm"}
            onClick={() => setIsShowFilterForm(true)}
            disabled={isBusy}
          >
            <FilterIcon />
            Filter issues
          </Button>

          {/* Modals */}
          <FilterIssuesForm
            handleDone={(filters) => {
              handleFindByManyParams(filters);
            }}
            isBusy={isBusy}
            setIsOpen={setIsShowFilterForm}
            isOpen={isShowFilterForm}
          />

          <ShowDeliveryNearYouForm
            isBusy={isBusy}
            handleDone={(zipcode) => {
              handleFindByZipcode(zipcode);
            }}
            isOpen={isShowShowDeliveryIssuesForm}
            setIsOpen={setIsShowShowDeliveryIssues}
          />
        </div>

        <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertOptions} />
      </div>
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
