import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ZoomMeetingInterface {
  id?: string;
  meeting_link: string;
  meeting_date: any;
  course_id: string;
  user_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ZoomMeetingGetQueryInterface extends GetQueryInterface {
  id?: string;
  meeting_link?: string;
  course_id?: string;
  user_id?: string;
  status?: string;
}
