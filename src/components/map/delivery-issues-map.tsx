"use client";

import FilterIssuesForm, { IFilterIssueParams } from "../modals/filter-issues-form";
import { Button } from "../ui/button";
import { AdvancedMarker, APIProvider, Map, Marker, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

import FilterIcon from "./filter-icon";
import { useEffect, useMemo, useState } from "react";
import PinIcon from "./pin-icon";
import ShowDeliveryNearYouForm from "../modals/show-delivery-near-you-form";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { AppConfig, deliveryCompanies } from "../../utils/constants";
import useAppFormPost from "@/hooks/useAppFormPost";
import { IDeliveryIssue } from "../../airtable/types";
import AppAlertDialog, { useAppAlertDialog } from "../ui/AppAlertDialog";
import { GoogleMapService } from "../../utils/google-map-service";
import LoadGoogleMapProvider from "./load-map";

type IssueInfo = {
  count: number | null;
  location: string;
  issue?: string;
  carrierLogo?: string;
};
const initialData: IssueInfo = { count: null, location: "", issue: "", carrierLogo: "" };

const zoomLevels = {
  USA: 5,
  DEFAULT: 13,
};

const centerPoints = {
  USA: {
    lat: 39.77486255876189,
    lng: -101.80094565458676,
  },
};

const CURRENT_GOOGLE_MAP_ID = "19cefe5f097a79a6_tn";

export default function DeliveryIssuesMap() {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);
  const [isMapEnabled, setIsMapEnabled] = useState(true);
  const [isShowShowDeliveryIssuesForm, setIsShowShowDeliveryIssues] = useState(false);
  const [deliveryIssue, setDeliveryIssue] = useState<IssueInfo>({ ...initialData });
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();
  const { postData, isBusy } = useAppFormPost();
  // const map = useMap();
  const [userZoom, setUserZoom] = useState(zoomLevels.USA);
  const [center, setCenter] = useState(centerPoints.USA);
  // const geocodingLib = useMapsLibrary("geocoding");
  // const geocoder = useMemo(() => geocodingLib && new geocodingLib.Geocoder(), [geocodingLib]);

  useEffect(() => {
    // getAllDeliveryIssues().catch(() => {});
  }, []);

  function centerToUsa() {
    if (userZoom !== zoomLevels.USA || center.lat !== centerPoints.USA.lat) {
      setUserZoom(zoomLevels.USA);
      setCenter(centerPoints.USA);
      restartMap();
    }
  }

  function restartMap() {
    setIsMapEnabled(false);
    setTimeout(() => {
      setIsMapEnabled(true);
    }, 500);
  }

  // useEffect(() => {
  //   if (!map) return;
  //   map.setCenter(center);
  // }, [center]);

  // useEffect(() => {
  //   if (!map) return;
  //   map.setZoom(userZoom);
  // }, [userZoom]);

  // useEffect(() => {
  //   if (!map) return;
  //   // do something with the map instance
  // }, [map]);

  function getDeliveryCompanyByName(name: string | undefined) {
    if (!name) return undefined;
    return deliveryCompanies.find((f) => f?.name?.toLowerCase() === name?.toLowerCase());
  }

  async function handleFindByManyParams(params: Partial<IFilterIssueParams>) {
    try {
      const filter01: string[] = [];

      const params01: Partial<IFilterIssueParams> = {};

      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (key && val) {
            if (typeof val === "string") {
              filter01.push(`{${key}}="${val}"`);
            } else {
              filter01.push(`{${key}}=${val}`);
            }
            params01[key as keyof IFilterIssueParams] = val;
          }
        });
      }

      if (!filter01?.length) {
        openAlertDialog.warning({ title: "You must select filter parameter(s) to proceed" });
        return;
      }

      const apiData = await postData<IDeliveryIssue[]>({
        url: "/api/delivery-issue/find",
        formData: { filterByFormula: `AND(${filter01.join(",")})` },
      });

      const carrierLogo = getDeliveryCompanyByName(params01.shipping_carrier)?.logoUrl || "";
      const issue01 = params01.issue || "Delivery issues";

      const options01: IssueInfo = {
        count: null,
        issue: issue01,
        location: "",
        carrierLogo,
      };

      if (Object.keys(params01).length === 1) {
        if (params01.shipping_carrier || params01.zipcode || params01.issue) {
          /*
          The total amount of (delivery issues)  is "only"  related:
            - when they look up just the postal/zip code
            - when they look up just shipping carrier
            - when they look up just an delivery issue
      */
          options01.count = apiData.length;
        }
      }

      if (apiData?.length === 1 && apiData[0].zipcode) {
        console.log({ apiData });
        const result01 = await GoogleMapService.getGeocodeAddressByZipcode(apiData[0].zipcode);

        const results02 = GoogleMapService.getFirtstLocation(result01);
        console.log({ results02 });

        if (results02) {
          setUserZoom(zoomLevels.DEFAULT);
          setCenter(results02);
          restartMap();
        }

        // GoogleMapService.getGeocodeAddressByZipcode(params01.zipcode)
        //   .then((res) => console.log(res))
        //   .catch((e) => console.error(e));
      } else {
        centerToUsa();
      }

      setDeliveryIssue(options01);

      openAlertDialog.info({
        title: `${apiData.length} issue(s) found`,
        // description: apiData.length ? "Note: Map location mark not implimented yet" : undefined,
      });

      setIsShowFilterForm(false);
      setIsShowShowDeliveryIssues(false);
    } catch (error) {
      console.error(error);
      console.log({ error });
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
        setDeliveryIssue({ ...initialData });
      }
    } catch (error) {
      openAlertDialog.error({ title: "Could not filter. Error occured" });
    }
  }

  return (
    <LoadGoogleMapProvider>
      <div className={"relative h-[600px] w-full overflow-hidden md:h-[640px] md:rounded-2xl"}>
        {isMapEnabled && (
          <>
            <Map
              defaultZoom={userZoom}
              defaultCenter={center}
              disableDefaultUI={true}
              mapId={CURRENT_GOOGLE_MAP_ID}
              //   onCameraChanged={ (ev: MapCameraChangedEvent) =>
              //     console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              //   }
            >
              <>
                {/* <Marker position={{ lat: 32.9618763, lng: -96.99609249999999 }} /> */}

                {/* <AdvancedMarker position={center}>
              <img src={deliveryIssue.carrierLogo || "/markers/cube.svg"} alt="" className={"size-8"} />
            </AdvancedMarker> */}

                {deliveryIssue.issue && (
                  <AdvancedMarker position={center}>
                    <HoverCard open={true}>
                      <HoverCardTrigger>
                        <img src={deliveryIssue.carrierLogo || "/markers/cube.svg"} alt="" className={"size-8"} />
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
                          {deliveryIssue.count && <span className="font-bold"> {deliveryIssue.count} - </span>}
                          {deliveryIssue.issue && <span className="font-bold"> {deliveryIssue.issue}</span>}
                        </div>
                        {deliveryIssue.location && (
                          <div className="flex items-center gap-1 rounded-lg bg-[#2F3233] px-2 py-1 text-sm text-white">
                            <PinIcon />
                            <span>{deliveryIssue.location}</span>
                          </div>
                        )}
                      </HoverCardContent>
                    </HoverCard>
                  </AdvancedMarker>
                )}
              </>
            </Map>
          </>
        )}

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
            handleDone={(zipcode) => zipcode && handleFindByManyParams({ zipcode })}
            isOpen={isShowShowDeliveryIssuesForm}
            setIsOpen={setIsShowShowDeliveryIssues}
          />
        </div>

        <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertOptions} />
      </div>
    </LoadGoogleMapProvider>
  );
}
