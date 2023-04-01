import BadRequestError from '@src/Domain/Errors/BadRequestError'

type UUID = string & { __type: 'UUID' }

export function isUUID(uuid: string): uuid is UUID {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    const match = uuid.match(uuidRegex)
    return !(match == null)
}

export function assertIsUUID(uuid: string): asserts uuid is UUID {
    if (!isUUID(uuid)) {
        throw new BadRequestError(`${uuid} is not a valid uuid value`)
    }
}

export default UUID
