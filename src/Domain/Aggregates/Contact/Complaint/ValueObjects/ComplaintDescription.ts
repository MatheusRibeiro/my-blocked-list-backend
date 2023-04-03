import BadRequestError from '@src/Domain/Errors/BadRequestError'

const MIN_LENGTH = 5
const MAX_LENGTH = 255

type ComplaintDescription = string & { __type: 'ComplaintDescription' }

export function isComplaintDescription(value: string): value is ComplaintDescription {
    return value.length >= MIN_LENGTH && value.length <= MAX_LENGTH
}

export function assertIsComplaintDescription(value: string): asserts value is ComplaintDescription {
    if (!isComplaintDescription(value)) {
        throw new BadRequestError(`${value} is not a valid complaint description value`)
    }
}

export default ComplaintDescription
