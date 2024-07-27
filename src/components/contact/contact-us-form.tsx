"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";

export default function ContactUsForm() {
  const [country, setCountry] = useState("US");
  return (
    <form className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 md:p-8">
      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="name" className={"text-sm text-black"}>
          Name
        </label>
        <Input type="text" id={"name"} required placeholder={"Name"} />
      </div>

      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="email" className={"text-sm text-black"}>
          Email
        </label>
        <Input type="email" id={"email"} required placeholder={"Email"} />
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="phone" className={"text-sm text-black"}>
          Phone
        </label>

        <div>
          <PhoneInput
            id={"phone"}
            defaultCountry={"US"}
            placeholder={"Phone number"}
          />
        </div>
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <label htmlFor="message" className={"text-sm text-black"}>
          Message
        </label>
        <Textarea placeholder={"What do you want to say"} rows={6} />
      </div>

      <Button>Send Message</Button>
    </form>
  );
}
