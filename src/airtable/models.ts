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
