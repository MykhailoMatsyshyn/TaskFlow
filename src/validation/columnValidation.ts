import * as yup from "yup";

/**
 * Validation schema for column creation and updating.
 * Ensures the title is required and unique (case-insensitive).
 */
export const getColumnSchema = (
  existingColumnTitles: string[],
  currentTitle?: string
) => {
  return yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test("unique", "Title must be unique", (value) => {
        if (!value) return false;
        const normalizedValue = value.toLowerCase();
        const normalizedExistingTitles = existingColumnTitles.map((title) =>
          title.toLowerCase()
        );

        if (currentTitle && normalizedValue === currentTitle.toLowerCase()) {
          return true;
        }

        return !normalizedExistingTitles.includes(normalizedValue);
      }),
  });
};
