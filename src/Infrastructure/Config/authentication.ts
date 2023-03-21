import currentEnvironment, { readEnvAsString, readEnvasNumber } from './environment'
export interface IAuthSettings {
    jwtSecret: string
    jwtExpirationInSeconds: number
}

const HourInSeconds = 60 * 60

const local: IAuthSettings = {
    jwtSecret: 'jwtsecret',
    jwtExpirationInSeconds: 24 * HourInSeconds,
}

const remote: IAuthSettings = {
    jwtSecret: readEnvAsString('JWT_SECRET'),
    jwtExpirationInSeconds: readEnvasNumber('JWT_EXPIRATION_IN_SECONDS', 24 * HourInSeconds),
}

const envs = {
    development: local,
    qa: remote,
    rc: remote,
    production: remote,
}

export default envs[currentEnvironment]
