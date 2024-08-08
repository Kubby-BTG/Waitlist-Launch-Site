"use client";

import FilterIssuesForm, { IFilterIssueParams } from "../modals/filter-issues-form";
import { Button } from "../ui/button";
import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";

import FilterIcon from "./filter-icon";
import { useContext, useEffect, useRef, useState } from "react";
import PinIcon from "./pin-icon";
import ShowDeliveryNearYouForm from "../modals/show-delivery-near-you-form";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { deliveryCompanies } from "../../utils/constants";
import useAppFormPost from "@/hooks/useAppFormPost";
import { IDeliveryIssue } from "../../airtable/types";
import AppAlertDialog, { useAppAlertDialog } from "../ui/AppAlertDialog";
import { GoogleMapService } from "../../utils/google-map-service";
import LoadGoogleMapProvider from "./load-google-map";
import { UtilService } from "../../utils/util-service";
import LoadGoogleMapGeocoding from "./load-googlemap-geocoding";

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
const CURRENT_GOOGLE_MAP_ID_MIAN = "a615f09cefe7997a_main";

export default function DeliveryIssuesMap() {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);
  const [isShowShowDeliveryIssuesForm, setIsShowShowDeliveryIssues] = useState(false);
  const [deliveryIssue, setDeliveryIssue] = useState<IssueInfo>({ ...initialData });
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();
  const { postData, isBusy } = useAppFormPost();
  const [zoom, setZoom1] = useState(zoomLevels.USA);
  const [center, setCenter1] = useState(centerPoints.USA);
  const map = useMap(CURRENT_GOOGLE_MAP_ID_MIAN);

  useEffect(() => {
    // getAllDeliveryIssues().catch(() => {});
  }, []);

  useEffect(() => {
    // console.log({ map });
  }, [map]);

  function setZoom(zoom01: number) {
    if (map?.setZoom) {
      map.setZoom(zoom01);
      setZoom1(zoom01);
    }
  }

  function setCenter(latLng: { lat: number; lng: number }) {
    if (map?.panTo) {
      map.panTo(latLng);
      setCenter1(latLng);
    }
  }

  function centerToUsa() {
    if (zoom !== zoomLevels.USA || center.lat !== centerPoints.USA.lat) {
      setZoom(zoomLevels.USA);
      setCenter(centerPoints.USA);
    }
  }

  function getDeliveryCompanyByName(name: string | undefined) {
    if (!name) return undefined;
    return deliveryCompanies.find((f) => f?.name?.toLowerCase() === name?.toLowerCase());
  }

  function drawCircle(latLng: { lat: number; lng: number }) {
    if (!map) return;
    const circle = new google.maps.Circle({
      strokeColor: "#008359",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      //
      fillColor: "#38DAA6",
      fillOpacity: 0.35,
      //
      center: latLng,
      radius: 3000,
    });
    circle.setMap(map);
  }

  function closeModals() {
    setIsShowFilterForm(false);
    setIsShowShowDeliveryIssues(false);
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

      options01.count = apiData.length;

      if (apiData?.length) {
        if (params01.zipcode && params01.zipcode === apiData[0].zipcode) {
          const firstData = apiData[0];

          if (firstData.zipcode_latitude && firstData.zipcode_longitude) {
            const latLng = {
              lat: firstData.zipcode_latitude,
              lng: firstData.zipcode_longitude,
            };

            closeModals();
            setCenter(latLng);
            drawCircle(latLng);
            await UtilService.waitUntilMilliseconds(2000);
            setZoom(zoomLevels.DEFAULT);
          } else {
            const result01 = (await GoogleMapService.getLocationInfoByZipcode(params01.zipcode))?.[0];

            if (result01) {
              closeModals();
              setCenter(result01.locationCoordinates);
              drawCircle(result01.locationCoordinates);
              await UtilService.waitUntilMilliseconds(2000);
              setZoom(zoomLevels.DEFAULT);
            } else {
              centerToUsa();
            }
          }
        } else {
          centerToUsa();
        }
      } else {
        centerToUsa();
      }

      setDeliveryIssue(options01);

      closeModals();

      openAlertDialog.info({ title: `${apiData.length} issue(s) found` });
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
        setDeliveryIssue({ ...initialData });
      }
    } catch (error) {
      openAlertDialog.error({ title: "Could not filter. Error occured" });
    }
  }

  return (
    <>
      <div className={"relative h-[600px] w-full overflow-hidden md:h-[640px] md:rounded-2xl"}>
        <Map
          defaultZoom={zoomLevels.USA}
          defaultCenter={centerPoints.USA}
          disableDefaultUI={true}
          mapId={CURRENT_GOOGLE_MAP_ID}
          // gestureHandling={"greedy"}
          id={CURRENT_GOOGLE_MAP_ID_MIAN}
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
                      {deliveryIssue.count !== null && <span className="font-bold"> {deliveryIssue.count} - </span>}
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
        {/* <LoadGoogleMapGeocoding /> */}
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
    </>
  );
}
