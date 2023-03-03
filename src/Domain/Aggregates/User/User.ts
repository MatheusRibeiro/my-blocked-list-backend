import Entity from "../../Base/Entity";
import Password from "./ValueObjects/Password";
import UserId from "./ValueObjects/UserId";
import Username from "./ValueObjects/Username";

export default class User extends Entity {
    public readonly userId: UserId
    public readonly username: Username
    private readonly password: Password

    constructor(
        userId: UserId,
        username: Username,
        password: Password
    ) {
        super()
        this.userId = userId
        this.username = username
        this.password = password
    }
    public isValid(): boolean {
        return this.username.isValid() && this.password.isValid()
    }

}