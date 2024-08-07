"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { AppConfig } from "../../utils/constants";
import { IPropsWithChildren } from "../../types";
import { useState } from "react";

export default function LoadGoogleMapProvider({ children }: IPropsWithChildren) {
  const [isShowFilterForm, setIsShowFilterForm] = useState(false);
  return (
    <APIProvider
      // libraries={["geocoding", "core", "maps"]}
      apiKey={AppConfig.NEXT_PUBLIC_GOOGLE_MAP_KEY}
      onLoad={() => setIsShowFilterForm(true)}
    >
      {isShowFilterForm ? <>{children}</> : null}
    </APIProvider>
  );
}
