import currentEnvironment, { readEnvAsString, readEnvAsNumber } from './environment'
export interface IAuthSettings {
    jwtSecret: string
    jwtExpirationInSeconds: number
    jwtRefreshExpirationInSeconds: number
}

const HourInSeconds = 60 * 60

const local: IAuthSettings = {
    jwtSecret: 'jwtsecret',
    jwtExpirationInSeconds: 1 * HourInSeconds,
    jwtRefreshExpirationInSeconds: 24 * HourInSeconds,
}

const remote: IAuthSettings = {
    jwtSecret: readEnvAsString('JWT_SECRET'),
    jwtExpirationInSeconds: readEnvAsNumber('JWT_EXPIRATION_IN_SECONDS', 1 * HourInSeconds),
    jwtRefreshExpirationInSeconds: readEnvAsNumber('JWT_REFRESH_EXPIRATION_IN_SECONDS', 24 * HourInSeconds),
}

const envs = {
    test: local,
    development: local,
    qa: remote,
    rc: remote,
    production: remote,
}

export default envs[currentEnvironment]
