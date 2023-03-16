import UserId from '../Aggregates/User/ValueObjects/UserId'

export default class Audit {
    public readonly who: UserId
    public readonly when: Date

    constructor(who: UserId) {
        this.who = who
        this.when = new Date()
    }
}
