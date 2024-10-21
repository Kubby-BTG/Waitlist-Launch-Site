import { ReactNode } from "react";

export default function UIDBlogLayout({ children }: { children: ReactNode }) {
  return (
    <main className={"bg-background"}>
      <div className="container mx-auto">{children}</div>
    </main>
  );
}
