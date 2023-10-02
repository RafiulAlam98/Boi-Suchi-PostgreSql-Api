import { z } from "zod";

const addBookValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    categoryId: z.string({
      required_error: "Category id is required",
    }),
  }),
});

const updateBookValidation = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const BookValidation = {
  addBookValidation,
  updateBookValidation,
};
