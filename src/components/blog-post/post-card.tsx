import Arrow from "../ui/arrow";
import { Badge } from "../ui/badge";

export default function PostCard() {
  return (
    <div
      className={
        "flex w-full flex-col gap-4 rounded-lg bg-background-secondary p-4 pb-6"
      }
    >
      <div className="flex h-[12.5rem] items-center justify-center rounded-[5px] bg-input">
        <span>Image placeholder</span>
      </div>

      <div className="flex flex-col gap-6 text-black/80">
        <div className="flex items-center justify-between">
          <p className={"text-xs uppercase leading-6"}>Blog/Sustainibility</p>

          <div className="flex size-8 items-center justify-center rounded-full border border-input text-black">
            <Arrow className={"size-4"} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={"text-lg font-bold leading-6"}>Sustainability</h3>

          <p className={"text-xs leading-5"}>
            Browse our wide selection of products from local stores and get
            everything on your list without leaving home.
          </p>

          <span className="text-gray flex gap-1 text-[11px] leading-5">
            <span>John Wesson</span>|<span>July 7, 2025</span>
          </span>

          <div className="flex gap-4">
            <Badge>Tag</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
