import Entity from "../../Base/Entity";
import UUID from "../../Base/ValueObject/UUID";
import Password from "./ValueObjects/Password";
import Username from "./ValueObjects/Username";

export default class User extends Entity {
    public readonly userId: UUID
    public readonly username: Username
    private readonly password: Password

    constructor(
        userId: UUID,
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