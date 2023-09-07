import * as yup from 'yup';

export const zoomMeetingValidationSchema = yup.object().shape({
  meeting_link: yup.string().required(),
  meeting_date: yup.date().required(),
  status: yup.string().required(),
  course_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
