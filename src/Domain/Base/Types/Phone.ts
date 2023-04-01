import BadRequestError from '@src/Domain/Errors/BadRequestError'

type Phone = string & { __type: 'Phone' }

export function isPhone(phone: string): phone is Phone {
    const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    const match = phone.match(phoneRegex)
    return !(match == null)
}

export function assertIsPhone(phone: string): asserts phone is Phone {
    if (!isPhone(phone)) {
        throw new BadRequestError(`${phone} is not a valid email value`)
    }
}

export default Phone
