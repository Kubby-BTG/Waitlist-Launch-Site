import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Button } from "../ui/button";
import Arrow from "../ui/arrow";
import KubbyLogo from "../ui/kubby-logo";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <footer className={"relative bg-background py-16"}>
      <div className="absolute inset-0">
        <PrismicNextImage
          field={settings.data.background_image}
          className={"h-full w-full object-cover"}
        />
      </div>
      <div className="container relative">
        <div className="flex flex-col gap-14 rounded-3xl bg-background-icon p-8 md:p-16">
          {/* Mobile CTA*/}
          <div className="flex flex-col gap-4 md:hidden">
            <PrismicRichText
              field={settings.data.cta_heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display text-[4.25rem] font-extrabold uppercase leading-[4.5rem] text-white">
                    {children}
                  </h2>
                ),
                strong: ({ children }) => (
                  <strong className="text-secondary">{children}</strong>
                ),
              }}
            />
            <PrismicRichText
              field={settings.data.cta_body}
              components={{
                paragraph: ({ children }) => (
                  <p className={"text-minimal text-sm leading-6"}>{children}</p>
                ),
              }}
            />

            <div>
              <Button variant={"accent"} className={"flex items-center gap-1"}>
                <span>{settings.data.cta_button_text}</span>
                <Arrow className={"flex-none"} />
              </Button>
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
                    <PrismicNextImage field={item.media_icon} />
                  </PrismicNextLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {settings.data.main_navigation.map((item, i) => (
                <PrismicNextLink
                  field={item.link}
                  key={i}
                  className={"text-sm text-white"}
                >
                  {item.label}
                </PrismicNextLink>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {settings.data.secondary_navigation.map((item, i) => (
                <PrismicNextLink
                  field={item.link}
                  key={i}
                  className={"text-sm text-white"}
                >
                  {item.label}
                </PrismicNextLink>
              ))}
            </div>

            <p className={"text-[0.625rem] leading-5 text-white"}>
              {settings.data.copyright}
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
                    <PrismicNextImage field={item.media_icon} />
                  </PrismicNextLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {settings.data.main_navigation.map((item, i) => (
                <PrismicNextLink
                  field={item.link}
                  key={i}
                  className={"text-sm text-white"}
                >
                  {item.label}
                </PrismicNextLink>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <PrismicRichText
                field={settings.data.cta_heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="font-display text-[4.25rem] font-extrabold uppercase leading-[4.5rem] text-white">
                      {children}
                    </h2>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-secondary">{children}</strong>
                  ),
                }}
              />
              <PrismicRichText
                field={settings.data.cta_body}
                components={{
                  paragraph: ({ children }) => (
                    <p className={"text-minimal text-sm leading-6"}>
                      {children}
                    </p>
                  ),
                }}
              />

              <div>
                <Button
                  variant={"accent"}
                  className={"flex items-center gap-1"}
                >
                  <span>{settings.data.cta_button_text}</span>
                  <Arrow className={"flex-none"} />
                </Button>
              </div>
            </div>

            <div className="col-span-2 flex gap-6">
              {settings.data.secondary_navigation.map((item, i) => (
                <PrismicNextLink
                  field={item.link}
                  key={i}
                  className={"text-sm text-white"}
                >
                  {item.label}
                </PrismicNextLink>
              ))}
            </div>

            <p className={"text-xs leading-5 text-white"}>
              {settings.data.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
