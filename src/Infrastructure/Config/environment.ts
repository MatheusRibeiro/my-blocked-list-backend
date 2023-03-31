export type Environment = 'test' | 'development' | 'qa' | 'rc' | 'production'

export function readEnvAsString(name: string, defaultValue = ''): string {
    const value = process.env[name]
    return value !== undefined ? value : defaultValue
}

export function readEnvasNumber(name: string, defaultValue?: number): number {
    const envStr = readEnvAsString(name)
    const shouldUseDefault = envStr === '' && defaultValue !== undefined
    const value = shouldUseDefault ? defaultValue : parseInt(envStr)

    return !isNaN(value) ? value : 0
}

const currentEnvironment = Object.assign({ NODE_ENV: 'development' }, process.env).NODE_ENV
export default currentEnvironment as Environment
