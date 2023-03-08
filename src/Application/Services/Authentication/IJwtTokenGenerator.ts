export default abstract class IJwtTokenGenerator {
    abstract generateToken (
        userId: string,
        firstName: string,
        lastName: string,
        username: string
    ): string
}
