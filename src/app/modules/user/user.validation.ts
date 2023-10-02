import { z } from "zod";

const createValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string()
      .email("Invalid email format")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email must be at most 100 characters"),
    contactNo: z.string({
      required_error: "Contact no is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    profileImg: z.string({
      required_error: "Profile Image is required",
    }),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email("Invalid email format")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email must be at most 100 characters")
      .optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  createValidationSchema,
  updateValidationSchema,
};
