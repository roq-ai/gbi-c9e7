import * as yup from 'yup';

export const studentValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  status: yup.string().required(),
  course_id: yup.string().nullable().required(),
});
