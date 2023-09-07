const mapping: Record<string, string> = {
  attendances: 'attendance',
  courses: 'course',
  organizations: 'organization',
  students: 'student',
  users: 'user',
  'zoom-meetings': 'zoom_meeting',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
