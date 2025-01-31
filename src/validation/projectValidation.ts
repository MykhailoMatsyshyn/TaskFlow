import * as yup from "yup";

/**
 * Validation schema for project creation and updating.
 * Ensures the title is required and unique (case-insensitive).
 */
export const getProjectSchema = (
  existingProjectTitles: string[] = [],
  currentTitle?: string
) => {
  return yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test("unique", "Title must be unique", (value) => {
        if (!value) return false;
        const normalizedValue = value.toLowerCase();
        const normalizedExistingTitles = existingProjectTitles.map((title) =>
          title.toLowerCase()
        );

        if (currentTitle && normalizedValue === currentTitle.toLowerCase()) {
          return true;
        }

        return !normalizedExistingTitles.includes(normalizedValue);
      }),
    description: yup.string().nullable(),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup
      .date()
      .required("End Date is required")
      .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
    assignedMembers: yup.array().of(yup.string()).nullable(),
    status: yup.string().oneOf(["planned", "in-progress", "completed"]),
    icon: yup.string().required("Icon selection is required"),
  });
};
