import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'course.create': {
    roles: ['it-support', 'administrator'],
    key: 'course-created',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'student.create': {
    roles: ['teacher', 'administrator'],
    key: 'student-added',
    tenantPath: ['organization', 'course', 'student'],
    userPath: [],
  },
  'attendance.create': {
    roles: ['teacher', 'administrator'],
    key: 'attendance-recorded',
    tenantPath: ['organization', 'course', 'student', 'attendance'],
    userPath: [],
  },
  'zoom_meeting.create': {
    roles: ['teacher', 'administrator'],
    key: 'zoom-meeting-scheduled',
    tenantPath: ['organization', 'course', 'zoom_meeting'],
    userPath: [],
  },
  'course.update': {
    roles: ['it-support', 'administrator'],
    key: 'course-updated',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'student.update': {
    roles: ['teacher', 'administrator'],
    key: 'student-details-updated',
    tenantPath: ['organization', 'course', 'student'],
    userPath: [],
  },
  'attendance.update': {
    roles: ['teacher', 'administrator'],
    key: 'attendance-record-updated',
    tenantPath: ['organization', 'course', 'student', 'attendance'],
    userPath: [],
  },
  'zoom_meeting.update': {
    roles: ['teacher', 'administrator'],
    key: 'zoom-meeting-updated',
    tenantPath: ['organization', 'course', 'zoom_meeting'],
    userPath: [],
  },
  'course.delete': {
    roles: ['it-support', 'administrator'],
    key: 'course-deleted',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'student.delete': {
    roles: ['teacher', 'administrator'],
    key: 'student-removed',
    tenantPath: ['organization', 'course', 'student'],
    userPath: [],
  },
  'attendance.delete': {
    roles: ['teacher', 'administrator'],
    key: 'attendance-record-deleted',
    tenantPath: ['organization', 'course', 'student', 'attendance'],
    userPath: [],
  },
  'zoom_meeting.delete': {
    roles: ['teacher', 'administrator'],
    key: 'zoom-meeting-cancelled',
    tenantPath: ['organization', 'course', 'zoom_meeting'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['it-support'];
const customerRoles: string[] = ['guest'];
const tenantRoles: string[] = ['administrator', 'teacher', 'it-support'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.organization.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
