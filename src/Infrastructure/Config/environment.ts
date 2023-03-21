export type Environment = 'development' | 'qa' | 'rc' | 'production'

const currentEnvironment = Object.assign({ NODE_ENV: 'development' }, process.env).NODE_ENV
export default currentEnvironment as Environment

export function readEnv(name: string): string {
    const value = process.env[name]
    return value !== undefined ? value : ''
}

export function readNumericEnv(name: string): number {
    return parseInt(readEnv(name))
}
