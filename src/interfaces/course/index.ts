import { AttendanceInterface } from 'interfaces/attendance';
import { StudentInterface } from 'interfaces/student';
import { ZoomMeetingInterface } from 'interfaces/zoom-meeting';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  name: string;
  description?: string;
  user_id: string;
  organization_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  student?: StudentInterface[];
  zoom_meeting?: ZoomMeetingInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    attendance?: number;
    student?: number;
    zoom_meeting?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
  organization_id?: string;
  status?: string;
}
