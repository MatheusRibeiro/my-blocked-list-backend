import currentEnvironment, { readEnvasNumber } from './environment'

export interface IApiSettings {
    port: number
}

const local: IApiSettings = {
    port: 8080,
}

const remote: IApiSettings = {
    port: readEnvasNumber('API_PORT'),
}

const envs = {
    test: local,
    development: local,
    qa: remote,
    rc: remote,
    production: remote,
}

export default envs[currentEnvironment]
