// not using interface or abstract class due known issues with DI lib tsyringe
export default class IJwtTokenGenerator {
    generateToken(userId: string, firstName: string, lastName: string, username: string) : string {throw Error}
}