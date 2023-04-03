import BadRequestError from '@src/Domain/Errors/BadRequestError'

export const DEFAULT_USER_ROLE = 'USER'
const roles = [DEFAULT_USER_ROLE, 'ADMIN'] as const

type UserRole = (typeof roles)[number]

const invalidUserRoleMessage = `Invalid value for user role. The accepted values are ${roles.join(', ')}`
export function isUserRole(value: string): value is UserRole {
    return roles.includes(value as UserRole)
}
export function assertIsUserRole(value: string): asserts value is UserRole {
    if (!isUserRole(value)) {
        throw new BadRequestError(invalidUserRoleMessage)
    }
}

export default UserRole
