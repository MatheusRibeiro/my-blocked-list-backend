export default abstract class DomainError extends Error {
    abstract readonly code: number
    abstract readonly title: string
}
