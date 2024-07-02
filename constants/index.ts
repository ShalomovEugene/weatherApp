import { z } from "zod";

export const searchForm = z.object({
  city: z.string().min(3, {
    message: "City must be at least 3 characters.",
  }),
});

export const defaultValuesSearchForm = {
  city: "",
};
