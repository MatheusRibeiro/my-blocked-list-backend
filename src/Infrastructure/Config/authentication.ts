import currentEnvironment, { readEnv, readNumericEnv } from './environment'
export interface IAuthSettings {
    jwtSecret: string
    jwtExpirationInSeconds: number
}

const local: IAuthSettings = {
    jwtSecret: 'jwtsecret',
    jwtExpirationInSeconds: 3600,
}

const remote: IAuthSettings = {
    jwtSecret: readEnv('JWT_SECRET'),
    jwtExpirationInSeconds: readNumericEnv('JWT_EXPIRATION_IN_SECONDS'),
}

const envs = {
    development: local,
    qa: remote,
    rc: remote,
    production: remote,
}

export default envs[currentEnvironment]
