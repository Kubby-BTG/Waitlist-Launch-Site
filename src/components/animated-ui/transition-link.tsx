"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useExitAnimation } from "./use-exit-animation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ children, href, onClick, className, ...props }) => {
  const router = useRouter();
  const { show, hide } = useExitAnimation();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // const body = document.querySelector("body");

    // body?.classList.add("page-transition");
    show();

    await sleep(800);
    onClick?.(e);

    router.push(href);
    await sleep(200);

    hide();

    // body?.classList.remove("page-transition");
  };

  return (
    <Link
      {...props}
      href={href}
      onClick={() => {
        // TODO Animation
        console.log({ Link: href });
      }}
      className={className}
    >
      {children}
    </Link>
  );
};
