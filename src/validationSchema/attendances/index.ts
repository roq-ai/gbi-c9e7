import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  date: yup.date().required(),
  status: yup.string().required(),
  student_id: yup.string().nullable().required(),
  course_id: yup.string().nullable().required(),
});
