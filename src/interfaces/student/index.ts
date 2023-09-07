import { AttendanceInterface } from 'interfaces/attendance';
import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface StudentInterface {
  id?: string;
  first_name: string;
  last_name: string;
  status: string;
  course_id: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  course?: CourseInterface;
  _count?: {
    attendance?: number;
  };
}

export interface StudentGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  status?: string;
  course_id?: string;
}
