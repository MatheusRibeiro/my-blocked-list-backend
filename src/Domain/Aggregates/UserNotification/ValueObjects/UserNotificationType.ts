import BadRequestError from '@src/Domain/Errors/BadRequestError'

const userNotificationTypeValues = ['ContactReported', 'ComplaintRemoved'] as const

type UserNotificationType = (typeof userNotificationTypeValues)[number]

const invalidMessage = `Invalid value for user role. The accepted values are ${userNotificationTypeValues.join(', ')}`
export function isUserNotificationType(value: string): value is UserNotificationType {
    return userNotificationTypeValues.includes(value as UserNotificationType)
}
export function assertIsUserNotificationType(value: string): asserts value is UserNotificationType {
    if (!isUserNotificationType(value)) {
        throw new BadRequestError(invalidMessage)
    }
}

export default UserNotificationType
