import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import KubbyLogo from "../ui/kubby-logo";
import { TransitionLink } from "../animated-ui/transition-link";
import { asLink } from "@prismicio/client";
import { AppScrollToTopButton } from "../ui/AppScrollToTopButton";
import SalesIQ from "../helpers/SalesIQ";
import { AppleStoreButton } from "../ui/AppleStoreButton";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <>
      <AppScrollToTopButton />
      <SalesIQ />
      <footer className={"relative bg-background py-16"}>
        <div className="absolute inset-0">
          <PrismicNextImage field={settings.data.background_image} className={"h-full w-full object-cover"} alt="" />
        </div>
        <div className="container relative">
          <div className="flex flex-col gap-14 rounded-3xl bg-background-icon p-8 md:p-16">
            {/* Mobile CTA*/}
            <div className="flex flex-col gap-4 md:hidden">
              <PrismicRichText
                field={settings.data.cta_heading}
                components={{
                  heading2: ({ children }) => <h2 className="heading-3 text-balance text-white">{children}</h2>,
                  strong: ({ children }) => <strong className="text-secondary">{children}</strong>,
                }}
              />
              <PrismicRichText
                field={settings.data.cta_body}
                components={{
                  paragraph: ({ children }) => <p className={"text-sm leading-6 text-minimal"}>{children}</p>,
                }}
              />

              <div>
                <AppleStoreButton />
              </div>
            </div>
            {/* Mobile Nav */}
            <div className="flex flex-col gap-6 md:hidden">
              <div className="flex flex-col gap-6">
                <KubbyLogo />

                <div className="flex gap-2">
                  {settings.data.social_media.map((item, i) => (
                    <PrismicNextLink field={item.media_link} key={i}>
                      <span className="sr-only">{item.media_name}</span>
                      <PrismicNextImage field={item.media_icon} alt="" />
                    </PrismicNextLink>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {settings.data.main_navigation.map((item, i) => (
                  <TransitionLink
                    href={asLink(item.link) as string}
                    key={i}
                    className={"text-sm text-white hover:underline hover:underline-offset-4"}
                  >
                    {item.label}
                  </TransitionLink>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {settings.data.secondary_navigation.map((item, i) => (
                  <PrismicNextLink
                    field={item.link}
                    key={i}
                    className={"text-sm text-white hover:underline hover:underline-offset-4"}
                  >
                    {item.label}
                  </PrismicNextLink>
                ))}
              </div>

              <p className={"text-[0.625rem] leading-5 text-white"}>
                {settings.data.copyright}
                <span className="block">Patents Pending</span>
              </p>
            </div>

            {/* Desktop CTA and Nav */}
            <div className="hidden grid-cols-3 gap-x-2 gap-y-14 md:grid">
              <div className="flex flex-col gap-6">
                <KubbyLogo />

                <div className="flex gap-2">
                  {settings.data.social_media.map((item, i) => (
                    <PrismicNextLink field={item.media_link} key={i}>
                      <span className="sr-only">{item.media_name}</span>
                      <PrismicNextImage field={item.media_icon} alt="" />
                    </PrismicNextLink>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {settings.data.main_navigation.map((item, i) => (
                  <TransitionLink
                    href={asLink(item.link) as string}
                    key={i}
                    className={"text-sm text-white hover:underline hover:underline-offset-4"}
                  >
                    {item.label}
                  </TransitionLink>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <PrismicRichText
                  field={settings.data.cta_heading}
                  components={{
                    heading2: ({ children }) => <h2 className="heading-3 text-balance text-white">{children}</h2>,
                    strong: ({ children }) => <strong className="text-secondary">{children}</strong>,
                  }}
                />
                <PrismicRichText
                  field={settings.data.cta_body}
                  components={{
                    paragraph: ({ children }) => <p className={"text-sm leading-6 text-minimal"}>{children}</p>,
                  }}
                />

                <div className={"mt-4"}>
                  <AppleStoreButton />
                </div>
              </div>

              <div className="col-span-2 flex gap-6">
                {settings.data.secondary_navigation.map((item, i) => (
                  <PrismicNextLink
                    field={item.link}
                    key={i}
                    className={"text-sm text-white hover:underline hover:underline-offset-4"}
                  >
                    {item.label}
                  </PrismicNextLink>
                ))}
              </div>

              <p className={"text-xs leading-5 text-white"}>
                {settings.data.copyright}
                <span className="block">Patents Pending</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
