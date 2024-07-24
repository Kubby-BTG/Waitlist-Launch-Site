"use client";

import { createPortal } from "react-dom";

export default function MobileMenu() {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50"></div>,
    document.body,
  );
}
