import { z } from "zod";

export function getWaitlistSchema() {
  const schema = z.object({
    id: z.string().optional(),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email address",
      })
      .trim()
      .email({ message: "Invalid email address" }),

    reasonForJoining: z
      .string({
        required_error: "Reason for joining is required",
        invalid_type_error: "Reason for joining must be a string",
      })
      .min(4, { message: "Reason for joining is required" })
      .trim(),
  });
  return schema;
}

export function getDeliveryIssueSchema() {
  const schema = z.object({
    id: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email address",
      })
      .trim()
      .email({ message: "Invalid email address" }),

    delivery_date: z
      .date({
        coerce: true,
        invalid_type_error: "Invalid Date",
        required_error: "Date Required",
      })
      .max(new Date(), { message: "Date cannot be future date" })
      .transform((f) => f.toISOString().split("T")[0])
      .pipe(z.string().date("Invalid Date")),

    issue: z
      .string({
        required_error: "issue is required",
        invalid_type_error: "issue must be a string",
      })
      .min(3, { message: "issue is required" })
      .trim(),

    purchase_store_name: z
      .string({
        required_error: "purchase_store_name is required",
        invalid_type_error: "purchase_store_name must be a string",
      })
      .min(3, { message: "purchase_store_name is required" })
      .trim(),

    shipping_carrier: z
      .string({
        required_error: "shipping_carrier is required",
        invalid_type_error: "shipping_carrier must be a string",
      })
      .min(3, { message: "shipping_carrier is required" })
      .trim(),

    zipcode: z
      .string({
        required_error: "zipcode is required",
        invalid_type_error: "zipcode must be a string",
      })
      .min(2, { message: "zipcode is required" })
      .trim(),

    zipcode_latitude: z.number({ coerce: true }).optional(),
    zipcode_longitude: z.number({ coerce: true }).optional(),
  });
  return schema;
}

export function getContactSchema() {
  const schema = z.object({
    id: z.string().optional(),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email address",
      })
      .trim()
      .email({ message: "Invalid email address" }),

    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      })
      .min(2, { message: "name is required" })
      .trim(),

    phone: z.string().optional(),

    comment: z.string().optional(),
  });
  return schema;
}

export function getPartnerSchema() {
  const schema = z.object({
    id: z.string().optional(),

    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      })
      .min(2, { message: "name is required" })
      .trim(),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email address",
      })
      .trim()
      .email({ message: "Invalid email address" }),

    zipcode: z
      .string({
        required_error: "zipcode is required",
        invalid_type_error: "zipcode must be a string",
      })
      .min(2, { message: "zipcode is required" })
      .trim(),

    company: z
      .string({
        required_error: "company is required",
        invalid_type_error: "company must be a string",
      })
      .min(3, { message: "company is required" })
      .trim(),

    city: z
      .string({
        required_error: "city is required",
        invalid_type_error: "city must be a string",
      })
      .min(3, { message: "city is required" })
      .trim(),

    state: z
      .string({
        required_error: "state is required",
        invalid_type_error: "state must be a string",
      })
      .min(3, { message: "state is required" })
      .trim(),

    address: z.string().optional(),
  });
  return schema;
}
