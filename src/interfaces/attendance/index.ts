import { StudentInterface } from 'interfaces/student';
import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface AttendanceInterface {
  id?: string;
  date: any;
  status: string;
  student_id: string;
  course_id: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  course?: CourseInterface;
  _count?: {};
}

export interface AttendanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  student_id?: string;
  course_id?: string;
}
