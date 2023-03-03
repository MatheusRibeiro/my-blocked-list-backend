import { autoInjectable } from "tsyringe";
import IJwtTokenGenerator from "../../Application/Services/Authentication/IJwtTokenGenerator";

@autoInjectable()
export default class JwtTokenGenerator implements IJwtTokenGenerator {
    generateToken(userId: string, firstName: string, lastName: string, username: string): string {
        return 'token generated on infra layer'
    }

}