"use client";

import { createPortal } from "react-dom";
import KubbyLogo from "../ui/kubby-logo";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { asLink, GroupField, LinkField } from "@prismicio/client";
import { SettingsDocumentDataNavigationItem, Simplify } from "../../../prismicio-types";
// import { PrismicNextLink } from "@prismicio/next";
import { Button } from "../ui/button";
import Arrow from "../ui/arrow";
import WaitlistForm from "../modals/waitlist-form";
import { TransitionLink } from "../animated-ui/transition-link";
import MountModalPortal from "../helpers/MountModalPortal";
import useAppScrollToSection from "../../hooks/useAppScrollToSection";

export default function MobileMenu({
  setIsOpen,
  navigation,
  reportLink,
  post,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navigation: GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
  reportLink: LinkField;
  post?: ReactNode;
}) {
  const { scrollToSection } = useAppScrollToSection();
  return (
    <MountModalPortal>
      <div className="fixed inset-0 z-50 bg-background md:hidden">
        <div className="absolute inset-0 h-dvh overflow-auto">
          <div className="relative flex h-16 items-center justify-between bg-background px-6">
            <TransitionLink href={"/"} handleClick={() => setIsOpen(false)}>
              <span className="sr-only">Home</span>
              <KubbyLogo iconOnly />
            </TransitionLink>
            <div className="md:hidden">
              <button
                className="flex size-9 items-center justify-center rounded bg-background-muted"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close Menu</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4714 3.52859C12.7318 3.78894 12.7318 4.21105 12.4714 4.4714L4.47145 12.4714C4.2111 12.7317 3.78899 12.7317 3.52864 12.4714C3.26829 12.2111 3.26829 11.7889 3.52864 11.5286L11.5286 3.52859C11.789 3.26824 12.2111 3.26824 12.4714 3.52859Z"
                    fill="#2F3233"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.52864 3.52859C3.78899 3.26824 4.2111 3.26824 4.47145 3.52859L12.4714 11.5286C12.7318 11.7889 12.7318 12.2111 12.4714 12.4714C12.2111 12.7317 11.789 12.7317 11.5286 12.4714L3.52864 4.4714C3.26829 4.21105 3.26829 3.78894 3.52864 3.52859Z"
                    fill="#2F3233"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-8 px-6 pb-8">
            {/* Nav */}
            <ul className="mt-10 flex flex-col">
              {navigation.map((item, i) => {
                const href01 = asLink(item.link) as string;
                // console.log({ href01 });
                return (
                  <li
                    key={i}
                    className={
                      "border-b border-b-background-muted py-1 font-display text-[3rem] font-extrabold uppercase leading-[2.5rem] text-primary"
                    }
                  >
                    <TransitionLink
                      className="block bg-danger"
                      href={href01}
                      handleClick={() => {
                        // console.log({ href01 });
                        // if (href01.startsWith("/#")) {
                        //   const idPart = href01.trim().split("/#")[1]?.trim();
                        //   console.log({ idPart });
                        //   if (idPart) {
                        //     // href01.split("#")
                        //     scrollToSection(idPart);
                        //   }
                        // }
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                );
              })}
              <li
                className={
                  "border-b border-b-background-muted py-1 font-display text-[3rem] font-extrabold uppercase leading-[2.5rem] text-primary"
                }
              >
                <TransitionLink href={asLink(reportLink) as string} handleClick={() => setIsOpen(false)}>
                  Report Delivery Issue
                </TransitionLink>
              </li>
            </ul>
            <div className={"w-full"}>
              <WaitlistForm>
                <Button type={"button"} className={"flex w-full items-center gap-1 bg-primary hover:bg-primary/80"}>
                  <span>Join Waitlist</span>
                  <Arrow className={"flex-none"} />
                </Button>
              </WaitlistForm>
            </div>
            {post}
          </div>
        </div>
      </div>
    </MountModalPortal>
  );
}

//
