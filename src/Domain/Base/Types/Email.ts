import BadRequestError from '@src/Domain/Errors/BadRequestError'

type Email = string & { __type: 'Email' }

export function isEmail(email: string): email is Email {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const match = email.match(emailRegex)
    return !(match == null)
}

export function assertIsEmail(email: string): asserts email is Email {
    if (!isEmail(email)) {
        throw new BadRequestError(`${email} is not a valid email value`)
    }
}

export default Email
