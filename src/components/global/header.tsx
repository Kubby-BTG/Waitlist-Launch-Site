import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Navbar from "./navbar";
import StickyHeaderWrapper from "../animated-ui/sticky-header-wrapper";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <StickyHeaderWrapper>
      <header>
        <div className="flex items-center justify-center gap-2 bg-background-invert py-3 text-white">
          <p className="">Issue with your delivery {">"}</p>
          <PrismicNextLink
            field={settings.data.report_link}
            className={"font-bold text-secondary underline"}
          >
            Report it here
          </PrismicNextLink>
        </div>
        {/* Navbar */}
        <Navbar navigation={settings.data.navigation} />
      </header>
    </StickyHeaderWrapper>
  );
}
