import Entity from '@src/Domain/Base/Abstractions/Entity'
import Password from './ValueObjects/Password'
import UserId from './ValueObjects/UserId'
import Username from './ValueObjects/Username'
import UserRole from './ValueObjects/UserRole'

export default class User extends Entity {
    protected readonly userId: UserId
    protected username: Username
    protected role: UserRole
    protected password: Password

    constructor(userId: UserId, username: Username, role: UserRole, password: Password) {
        super()
        this.userId = userId
        this.username = username
        this.role = role
        this.password = password
    }

    public getId(): UserId {
        return this.userId
    }

    public getUsername(): Username {
        return this.username
    }

    public setUsername(username: Username): void {
        this.username = username
    }

    public getRole(): UserRole {
        return this.role
    }

    public isPasswordCorrect(password: string): boolean {
        return this.password.isEqual(new Password(password))
    }

    public isValid(): boolean {
        return this.username.isValid() && this.password.isValid()
    }

    public isEqual(entity: User): boolean {
        return this.userId === entity.userId
    }

    public toJSON(): object {
        return {
            id: this.userId,
            username: this.username.toJSON(),
        }
    }
}
