interface Permissions {
  [key: string | number]: string[],
}

/**
 * Lists the permissions for each role.
 *
 * '*' acts as a glob-style wildcard.
 */


const permissions: Permissions = {
    // Customer Success+ Views +Task admin
    360003967493: ['sync.opp'],
    admin: ['*'],
};

/**
 * Escape regex special characters and insert regex for * globs.
 */
const makePermissionRegex = (pattern: string) => pattern.replace(/[.+?^${}()|[\]\\]/g,
    '\\$&').replace(/\*/g, '\.\+\?');

/**
 * Check that specified role has the specified permission.
 *
 * @param {string} role
 * @param {string|string[]} requestedPermissions
 * @returns {boolean}
 */
export const checkRolePermissions = (role: string, requestedPermissions: string | string[]) => {
    const rolePermissions = permissions[role];
    if (!Array.isArray(requestedPermissions)) {
        requestedPermissions = [requestedPermissions];
    }

    if (typeof rolePermissions === 'undefined') {
        return false;
    }

    for (const permission of rolePermissions) {
        const $permissionRegex = makePermissionRegex(permission).replaceAll('*', '.+?');
        for (const requestedPermission of requestedPermissions) {
            if (requestedPermission.match($permissionRegex)) {
                return true;
            }
        }
    }

    return false;
};

