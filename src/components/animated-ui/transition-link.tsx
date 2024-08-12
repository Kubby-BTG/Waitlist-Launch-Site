"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { IReactFC } from "../../types";
// import { useRouter } from "next/navigation";
// import { useExitAnimation } from "./use-exit-animation";

interface TransitionLinkProps {
  href: string;
  className?: string;
  handleClick?: () => void;
}

// function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const TransitionLink: IReactFC<TransitionLinkProps> = ({ children, handleClick, href, className }) => {
  // const router = useRouter();
  // const { show, hide } = useExitAnimation();

  // const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   e.preventDefault();
  //   // const body = document.querySelector("body");

  //   // body?.classList.add("page-transition");
  //   show();

  //   await sleep(800);
  //   onClick?.(e);

  //   router.push(href);
  //   await sleep(200);

  //   hide();

  //   // body?.classList.remove("page-transition");
  // };

  return (
    <Link href={href} onClick={() => handleClick && handleClick()} className={className}>
      {children}
    </Link>
  );
};
