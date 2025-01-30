import * as yup from "yup";

/**
 * Validation schema for column creation and updating.
 * Ensures the title is required and unique (case-insensitive).
 */
export const getColumnSchema = (existingColumnTitles: string[]) =>
  yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test(
        "unique",
        "Title must be unique",
        (value) =>
          !existingColumnTitles
            .map((title) => title.toLowerCase())
            .includes(value?.toLowerCase() || "")
      ),
  });
