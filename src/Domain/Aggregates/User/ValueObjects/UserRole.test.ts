import { assertIsUserRole } from './UserRole'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

const validRoles = ['USER', 'ADMIN']

describe('assertIsUserRole', () => {
    it('should throw an error if it is not a valid user role', () => {
        const testAssert = (): void => assertIsUserRole('invalid')
        expect(testAssert).toThrow(BadRequestError)
    })
    it('should return an empty result when is valid', () => {
        for (const role of validRoles) {
            expect(assertIsUserRole(role)).toBeUndefined()
        }
    })
})
