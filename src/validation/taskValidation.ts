import * as yup from "yup";

export const getTaskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().nullable(),
  assignedMember: yup.string().nullable(),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
  priority: yup.string().required(),
});
