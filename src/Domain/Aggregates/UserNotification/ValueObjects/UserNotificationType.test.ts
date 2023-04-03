import { assertIsUserNotificationType } from './UserNotificationType'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

const validNotificationTypes = ['ContactReported', 'ComplaintRemoved']

describe('assertIsUserNotificationType', () => {
    it('should throw an error if it is not a valid user notification type', () => {
        const testAssert = (): void => assertIsUserNotificationType('invalid')
        expect(testAssert).toThrow(BadRequestError)
    })
    it('should return an empty result when is valid', () => {
        for (const notificationType of validNotificationTypes) {
            expect(assertIsUserNotificationType(notificationType)).toBeUndefined()
        }
    })
})
