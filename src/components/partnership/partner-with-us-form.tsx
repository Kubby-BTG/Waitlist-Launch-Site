"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import KubbyLogo from "../ui/kubby-logo";
import RegisteredPartnership from "../modals/registered-partnership";

export default function PartnerWithUsForm() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-lg bg-white p-8 md:max-w-[26rem]"
    >
      <div className="flex items-center gap-1">
        <PartnerIcon />
        <p className="w-full text-base font-semibold text-black">
          Partner with us
        </p>
        <KubbyLogo iconOnly className={"size-7"} />
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="name" className={"text-sm text-black"}>
          Name
        </label>
        <Input type="text" id={"name"} required placeholder={"Your name"} />
      </div>

      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="email" className={"text-sm text-black"}>
          Email
        </label>
        <Input type="email" id={"email"} required placeholder={"Your email"} />
      </div>

      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="company-name" className={"text-sm text-black"}>
          Company
        </label>
        <Input
          type="text"
          id={"company-name"}
          required
          placeholder={"Your company name"}
        />
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="business-address" className={"text-sm text-black"}>
          Business Address
        </label>
        <Input
          type="text"
          id={"business-address"}
          required
          placeholder={"Your address"}
        />
      </div>

      <Button type={"submit"}>Continue</Button>

      <RegisteredPartnership setIsSent={setIsSent} isSent={isSent} />
    </form>
  );
}

const PartnerIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={"flex-none"}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.42 3.75325C3.43582 2.73743 4.81357 2.16675 6.25016 2.16675C7.06698 2.16675 7.81115 2.28357 8.53917 2.60065C9.04991 2.8231 9.52691 3.13289 10.0002 3.53287C10.4734 3.13289 10.9504 2.8231 11.4612 2.60065C12.1892 2.28357 12.9333 2.16675 13.7502 2.16675C15.1868 2.16675 16.5645 2.73743 17.5803 3.75325C18.5961 4.76908 19.1668 6.14683 19.1668 7.58341C19.1668 9.86827 17.659 11.5444 16.4198 12.759L10.5894 18.5893C10.264 18.9148 9.73634 18.9148 9.41091 18.5893L3.58253 12.761C2.32885 11.5484 0.833496 9.87458 0.833496 7.58341C0.833496 6.14683 1.40418 4.76908 2.42 3.75325ZM6.25016 3.83341C5.2556 3.83341 4.30177 4.2285 3.59851 4.93176C2.89525 5.63503 2.50016 6.58885 2.50016 7.58341C2.50016 9.12247 3.50075 10.3638 4.74601 11.5676L4.75609 11.5775L10.0002 16.8216L15.2502 11.5715C16.4937 10.353 17.5002 9.11337 17.5002 7.58341C17.5002 6.58885 17.1051 5.63503 16.4018 4.93176C15.6986 4.2285 14.7447 3.83341 13.7502 3.83341C13.1003 3.83341 12.5945 3.92493 12.1267 4.12868C11.6535 4.33477 11.1669 4.6785 10.5894 5.256C10.264 5.58144 9.73634 5.58144 9.41091 5.256C8.8334 4.6785 8.34685 4.33477 7.87365 4.12868C7.40584 3.92493 6.90001 3.83341 6.25016 3.83341Z"
      fill="#2F3233"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5891 4.07733C10.9145 4.40277 10.9145 4.9304 10.5891 5.25584L8.12028 7.72465C8.02899 7.81528 7.95654 7.92307 7.90709 8.04183C7.85765 8.16059 7.83219 8.28795 7.83219 8.41658C7.83219 8.54522 7.85765 8.67259 7.90709 8.79134C7.95654 8.9101 8.02899 9.01789 8.12028 9.10852L8.12243 9.11066C8.48747 9.47571 9.07376 9.49636 9.47376 9.14057L11.1982 7.55777C11.7839 7.02631 12.5465 6.73191 13.3373 6.73191C14.1275 6.73191 14.8894 7.02577 15.4748 7.55629C15.4754 7.55679 15.4759 7.55728 15.4765 7.55778L17.9402 9.77176C18.2825 10.0794 18.3106 10.6063 18.003 10.9486C17.6954 11.2909 17.1685 11.319 16.8262 11.0114L14.3565 8.79206C14.0775 8.53885 13.7142 8.39858 13.3373 8.39858C12.9613 8.39858 12.5986 8.53831 12.3198 8.7906L10.5895 10.3788C9.53995 11.3197 7.94572 11.2899 6.94498 10.2902C6.69815 10.0449 6.50222 9.75323 6.36846 9.43195C6.2345 9.1102 6.16553 8.76511 6.16553 8.41658C6.16553 8.06806 6.2345 7.72297 6.36846 7.40122C6.50221 7.07998 6.6981 6.78833 6.94489 6.54303L9.41059 4.07733C9.73602 3.75189 10.2637 3.75189 10.5891 4.07733Z"
      fill="#2F3233"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7441 10.7441C13.0695 10.4186 13.5972 10.4186 13.9226 10.7441L15.5893 12.4107C15.9147 12.7362 15.9147 13.2638 15.5893 13.5893C15.2638 13.9147 14.7362 13.9147 14.4107 13.5893L12.7441 11.9226C12.4186 11.5972 12.4186 11.0695 12.7441 10.7441Z"
      fill="#2F3233"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2441 13.2441C10.5695 12.9186 11.0972 12.9186 11.4226 13.2441L13.0893 14.9107C13.4147 15.2362 13.4147 15.7638 13.0893 16.0893C12.7638 16.4147 12.2362 16.4147 11.9107 16.0893L10.2441 14.4226C9.91864 14.0972 9.91864 13.5695 10.2441 13.2441Z"
      fill="#2F3233"
    />
  </svg>
);
