import { assertIsComplaintCategory, assertIsComplaintSeverity } from './ComplaintType'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

// const validCategories = ['SPAM', 'SCAM', 'HOAX', 'OTHER']
// const validSeverities = ['INFO', 'NOTICE', 'WARNING', 'CRITICAL', 'ALERT']

describe('assertIsComplaintCategory', () => {
    it('should throw an error if it is not a valid category', () => {
        const testAssert = (): void => assertIsComplaintCategory('invalid')
        expect(testAssert).toThrow(BadRequestError)
    })
})
describe('assertIsComplaintSeverity', () => {
    it('should throw an error if it is not a valid severity', () => {
        const testAssert = (): void => assertIsComplaintSeverity('invalid')
        expect(testAssert).toThrow(BadRequestError)
    })
})
