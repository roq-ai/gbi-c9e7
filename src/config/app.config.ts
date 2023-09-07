interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['IT Support'],
  customerRoles: ['Guest'],
  tenantRoles: ['Administrator', 'Teacher', 'IT Support'],
  tenantName: 'Organization',
  applicationName: 'gbi',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Interact with the organization'],
  ownerAbilities: [
    'Manage organizations',
    'Invite administrators and teachers to the application',
    'Update or delete organizations',
    'Manage roles and permissions of administrators and teachers',
  ],
};
