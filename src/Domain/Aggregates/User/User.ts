import Entity from '../../Base/AbstractEntity'
import Password from './ValueObjects/Password'
import UserId from './ValueObjects/UserId'
import Username from './ValueObjects/Username'

export default class User extends Entity {
    public userId: UserId
    public username: Username
    public password: Password

    constructor(userId: UserId, username: Username, password: Password) {
        super()
        this.userId = userId
        this.username = username
        this.password = password
    }

    public getId(): UserId {
        return this.userId
    }

    public isValid(): boolean {
        return this.username.isValid() && this.password.isValid()
    }

    public isEqual(entity: User): boolean {
        return this.userId.isEqual(entity.userId)
    }
}
