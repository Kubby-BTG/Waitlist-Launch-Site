"use client";

import { GroupField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  SettingsDocumentDataNavigationItem,
  Simplify,
} from "../../../prismicio-types";
import { Button } from "../ui/button";
import KubbyLogo from "../ui/kubby-logo";

export default function Navbar({
  navigation,
}: {
  navigation: GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
}) {
  return (
    <div className="bg-primary">
      <nav
        className={"container flex items-center justify-between py-[1.125rem]"}
      >
        <div className={"flex items-center gap-8"}>
          {/* Kubby Logo */}
          <KubbyLogo />
          {/* Desktop Navlinks */}
          <ul className="hidden items-center gap-6 md:flex">
            {navigation.map((item, i) => (
              <li key={i} className={"text-lg font-bold text-white"}>
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>

        <Button variant={"accent"}>Join Waitlist</Button>

        <div className="md:hidden">
          <button className="flex size-9 items-center justify-center rounded bg-brand">
            <span className="sr-only">Open Menu</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
      </nav>
    </div>
  );
}
