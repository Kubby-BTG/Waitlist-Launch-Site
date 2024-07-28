import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";
import CuratedPosts from "@/components/blog-post/curated-posts";
import PageWrapper from "@/components/animated-ui/page-wrapper";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return (
    <PageWrapper>
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:gap-20 lg:pb-14 lg:pt-12">
        <div className="flex w-full flex-grow flex-col gap-10">
          {/* Above section */}
          <div className={"flex flex-col gap-4 lg:mt-16 lg:gap-10"}>
            <PrismicRichText
              field={page.data.title}
              components={{
                heading1: ({ children }) => (
                  <h1
                    className={
                      "text-[2rem] font-bold leading-[2rem] text-primary"
                    }
                  >
                    {children}
                  </h1>
                ),
              }}
            />
            <span className="flex gap-1 text-sm leading-5 text-primary">
              <span>{page.data.author}</span>|
              <span>
                {page.data.publication_date
                  ? formatDate(page.data.publication_date)
                  : ""}
              </span>
            </span>
          </div>
          <div className="relative aspect-video max-w-[50rem] overflow-hidden rounded-[5px] lg:rounded-lg">
            <PrismicNextImage
              field={page.data.featured_image}
              className={"absolute inset-0 object-cover"}
            />
          </div>
          <div className="relative grid max-w-[50rem]">
            <SliceZone slices={page.data.slices} components={components} />

            <SocialMediaShareButtons />
          </div>
        </div>

        <div
          className={"flex flex-col gap-4 lg:max-w-[24rem] xl:max-w-[26rem]"}
        >
          <p
            className={
              "font-display text-[2.625rem] uppercase leading-[3rem] text-primary-darker"
            }
          >
            More <span className={"text-brand"}>Stories</span>
          </p>
          <CuratedPosts className={"md:grid-cols-2 lg:grid-cols-1"} />
        </div>
      </div>
    </PageWrapper>
  );
}

const SocialMediaShareButtons = () => {
  return (
    <div className="relative flex gap-4 max-lg:row-start-1 max-lg:mb-6 lg:absolute lg:right-0 lg:top-0 lg:flex-col">
      <a href="#">
        <span className="sr-only">Facebook</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_380_21698)">
            <path
              d="M18.6539 15.2501L19.2095 11.6307H15.7364V9.28198C15.7364 8.29198 16.2214 7.32636 17.777 7.32636H19.3558V4.24511C19.3558 4.24511 17.9233 4.00073 16.5533 4.00073C13.6933 4.00073 11.8239 5.73448 11.8239 8.87261V11.6314H8.64453V15.2507H11.8239V24.0007H15.7364V15.2507L18.6539 15.2501Z"
              fill="#008359"
            />
          </g>
          <defs>
            <clipPath id="clip0_380_21698">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(4 4)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
      <a href="#">
        <span className="sr-only">Linkedin</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_380_21702)">
            <path
              d="M21.0375 21.0444H18.0794V16.4025C18.0794 15.2956 18.0562 13.8731 16.5325 13.8731C14.99 13.8731 14.755 15.0737 14.755 16.3206V21.0438H11.7931V11.4994H14.6381V12.8012H14.6763C15.0738 12.0494 16.0406 11.2587 17.4831 11.2587C20.4837 11.2587 21.0406 13.2344 21.0406 15.8031V21.0438L21.0375 21.0444ZM8.44687 10.195C7.4925 10.195 6.7275 9.42313 6.7275 8.4725C6.7275 7.525 7.49562 6.75437 8.44687 6.75437C9.39812 6.75437 10.1687 7.525 10.1687 8.4725C10.1687 9.42313 9.39812 10.195 8.44687 10.195ZM9.93062 21.0444H6.9625V11.5H9.93062V21.0444ZM22.5225 4H5.475C4.66062 4 4 4.64437 4 5.44187V22.5588C4 23.3563 4.66062 24.0006 5.475 24.0006H22.5194C23.3325 24.0006 24 23.3563 24 22.5588V5.44187C24 4.64437 23.3325 4 22.5194 4L22.5225 4Z"
              fill="#008359"
            />
          </g>
          <defs>
            <clipPath id="clip0_380_21702">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(4 4)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
      <a href="#">
        <span className="sr-only">X</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_380_21706)">
            <path
              d="M18.7925 6.34033H21.3481L15.7648 12.7218L22.3332 21.4055H17.1902L13.162 16.1388L8.55284 21.4055H5.9956L11.9676 14.5798L5.6665 6.34033H10.94L14.5812 11.1542L18.7925 6.34033ZM17.8955 19.8758H19.3116L10.1706 7.78967H8.65094L17.8955 19.8758Z"
              fill="#008359"
            />
          </g>
          <defs>
            <clipPath id="clip0_380_21706">
              <rect
                width="16.6667"
                height="15.0667"
                fill="white"
                transform="translate(5.6665 6.3396)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
      <a href="#">
        <span className="sr-only">Instagram</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_380_21710)">
            <path
              d="M13.9997 4C11.2816 4 10.9429 4.01313 9.8791 4.05813C8.81098 4.11062 8.08848 4.27625 7.45098 4.52375C6.79348 4.78125 6.23348 5.12313 5.68035 5.67938C5.12348 6.2325 4.77848 6.7925 4.52473 7.45C4.27723 8.0875 4.1116 8.81 4.0591 9.87812C4.01098 10.9425 4.00098 11.2806 4.00098 13.9987C4.00098 16.7169 4.0141 17.0556 4.0591 18.1194C4.1116 19.1844 4.27723 19.91 4.52473 20.5475C4.78223 21.205 5.1241 21.765 5.68035 22.3181C6.23348 22.875 6.79348 23.22 7.45098 23.4738C8.08848 23.7181 8.8141 23.8869 9.8791 23.9394C10.9435 23.9875 11.2816 23.9975 13.9997 23.9975C16.7179 23.9975 17.0566 23.9844 18.1203 23.9394C19.1853 23.8869 19.911 23.7175 20.5485 23.4738C21.206 23.2163 21.766 22.8744 22.3191 22.3181C22.876 21.765 23.221 21.2081 23.4747 20.5475C23.7191 19.91 23.8878 19.1844 23.9403 18.1194C23.9885 17.055 23.9985 16.7169 23.9985 13.9987C23.9985 11.2806 23.9853 10.9419 23.9403 9.87812C23.8878 8.81312 23.7185 8.08375 23.4747 7.45C23.2172 6.7925 22.8753 6.2325 22.3191 5.67938C21.766 5.1225 21.2091 4.7775 20.5485 4.52375C19.911 4.27625 19.1853 4.11062 18.1203 4.05813C17.056 4.01 16.7179 4 13.9997 4ZM13.9997 5.8C16.6691 5.8 16.9879 5.81313 18.0428 5.85812C19.016 5.90375 19.546 6.06625 19.8979 6.20375C20.3672 6.38563 20.6953 6.60063 21.0504 6.95187C21.3985 7.3 21.6135 7.63187 21.7953 8.10125C21.9328 8.45312 22.0953 8.98312 22.141 9.95625C22.186 11.0113 22.1991 11.3306 22.1991 13.9994C22.1991 16.6681 22.186 16.9875 22.1372 18.0425C22.0847 19.0156 21.9222 19.5456 21.7853 19.8975C21.596 20.3669 21.3847 20.695 21.036 21.05C20.6841 21.3981 20.3491 21.6131 19.8835 21.795C19.536 21.9325 18.9985 22.095 18.0216 22.1406C16.961 22.1856 16.6485 22.1987 13.9722 22.1987C11.296 22.1987 10.9841 22.1856 9.92223 22.1369C8.9491 22.0844 8.41223 21.9219 8.06035 21.785C7.58535 21.5956 7.25973 21.3844 6.91098 21.0356C6.5591 20.6838 6.33535 20.3487 6.16285 19.8831C6.02285 19.5356 5.86285 18.9981 5.81098 18.0212C5.77535 16.9731 5.75848 16.6481 5.75848 13.9844C5.75848 11.3219 5.77535 10.9963 5.81098 9.935C5.86285 8.95813 6.02285 8.42188 6.16285 8.07312C6.33535 7.5975 6.55973 7.2725 6.91098 6.92062C7.2591 6.5725 7.58535 6.3475 8.06035 6.17125C8.41223 6.03437 8.93598 5.87188 9.91285 5.82313C10.9735 5.785 11.286 5.77125 13.9585 5.77125L13.9997 5.8ZM13.9997 8.86688C11.1616 8.86688 8.8666 11.165 8.8666 14C8.8666 16.8381 11.1647 19.1331 13.9997 19.1331C16.8379 19.1331 19.1328 16.835 19.1328 14C19.1328 11.1619 16.8347 8.86688 13.9997 8.86688ZM13.9997 17.3331C12.1572 17.3331 10.6666 15.8425 10.6666 14C10.6666 12.1575 12.1572 10.6669 13.9997 10.6669C15.8422 10.6669 17.3328 12.1575 17.3328 14C17.3328 15.8425 15.8422 17.3331 13.9997 17.3331ZM20.5397 8.66188C20.5397 9.32625 19.9991 9.8625 19.3378 9.8625C18.6735 9.8625 18.1372 9.32562 18.1372 8.66188C18.1372 8.00125 18.6772 7.46375 19.3378 7.46375C19.9985 7.46375 20.5397 8.00125 20.5397 8.66188Z"
              fill="#008359"
            />
          </g>
          <defs>
            <clipPath id="clip0_380_21710">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(4 4)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
