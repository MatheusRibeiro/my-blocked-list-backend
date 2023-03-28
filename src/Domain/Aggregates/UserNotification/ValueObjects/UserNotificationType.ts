import Enum from '@src/Domain/Base/ValueObject/Enum'

const userNotificationTypeValues = ['ContactReported', 'ComplaintRemoved']

export default class UserNotificationType extends Enum {
    constructor(value: string) {
        super(value, userNotificationTypeValues)
    }
}
