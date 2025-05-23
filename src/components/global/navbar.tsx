"use client";

import { asLink, GroupField, LinkField } from "@prismicio/client";
// import { PrismicNextLink } from "@prismicio/next";
import { SettingsDocumentDataNavigationItem, Simplify } from "../../../prismicio-types";
import { Button } from "../ui/button";
import KubbyLogo from "../ui/kubby-logo";
import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLockBodyScroll } from "react-use";
// import Link from "next/link";
import WaitlistForm from "../modals/waitlist-form";
import { usePathname } from "next/navigation";
import { TransitionLink } from "../animated-ui/transition-link";
import useIsIOS from "@/hooks/use-ios";
import { cn } from "../../lib/utils";

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

export default function Navbar({
  navigation,
  reportLink,
  post,
}: {
  navigation: GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
  reportLink: LinkField;
  post?: ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isIos = useIsIOS();

  const pathname = usePathname();

  useLockBodyScroll(isMobileMenuOpen && !isIos);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="bg-primary">
      <nav className={cn(["container flex h-[68px] items-center justify-between max-md:h-[64px]"])}>
        <div className={"flex items-center gap-8"}>
          {/* Kubby Logo */}
          <TransitionLink href={"/"}>
            <KubbyLogo />
            <span className="sr-only">Go home</span>
          </TransitionLink>
          {/* Desktop Navlinks */}
          <ul className="hidden items-center gap-4 md:flex">
            {navigation.map((item, i) => (
              <li
                key={i}
                className={cn([
                  "transition-500 rounded-full bg-white/0 px-4",
                  "py-[0.325rem] text-[0.938rem] font-medium leading-5 text-white",
                  "transition-colors ease-kubby hover:bg-white/5",
                ])}
              >
                {/* <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink> */}
                <TransitionLink href={asLink(item.link) as string}>{item.label}</TransitionLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row gap-4 max-md:hidden">
          <Button type={"button"} variant={"accent"} size={"sm"} className={"max-md:hidden"}>
            Become a Space Partner
          </Button>

          <Button type={"button"} variant={"outline"} size={"sm"} className={"border-white text-white max-md:hidden"}>
            Login to Space
          </Button>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded bg-background-icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 10C2.5 9.53976 2.8731 9.16666 3.33333 9.16666H16.6667C17.1269 9.16666 17.5 9.53976 17.5 10C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 5C2.5 4.53976 2.8731 4.16666 3.33333 4.16666H16.6667C17.1269 4.16666 17.5 4.53976 17.5 5C17.5 5.46023 17.1269 5.83333 16.6667 5.83333H3.33333C2.8731 5.83333 2.5 5.46023 2.5 5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <MobileMenu
            setIsOpen={(v) => {
              setIsMobileMenuOpen(v);
            }}
            navigation={navigation}
            reportLink={reportLink}
            post={post}
          />
        )}
      </nav>
    </div>
  );
}
