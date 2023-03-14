export default abstract class IJwtTokenGenerator {
    abstract generateToken(userId: string, username: string): string
}
