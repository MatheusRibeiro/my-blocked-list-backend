import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import Email from '@src/Domain/Base/Types/Email'
import AbstractWatchedContactUseCase from '../Abstractions/WatchedContactUseCase'
import IWatchedContactRepository from '../IWatchedContactRepository'
import WatchedContact from '../WatchedContact'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import EmailAccount from '../../Contact/ValueObjects/EmailAccount'
import UserWatchedContact from '../DomainEvents/UserWatchedContact'
import WatchedContactCreated from '../DomainEvents/WatchedContactCreated'

export interface WatchEmailContactDTO {
    email: Email
}

type WatchEmailContactEvents = UserWatchedContact | WatchedContactCreated

@injectable()
export default class WatchEmailContactUseCase extends AbstractWatchedContactUseCase<WatchEmailContactDTO> {
    constructor(@inject('WatchedContactRepository') WatchedContactRepository: IWatchedContactRepository) {
        super(WatchedContactRepository)
    }

    public async execute(dto: WatchEmailContactDTO, audit: Audit): Promise<WatchEmailContactEvents[]> {
        const { email } = dto
        const events: WatchEmailContactEvents[] = []

        const existingWatchedContact = await this.repository.findByEmail(email)
        const isANewWatchedContact = existingWatchedContact === null

        const watchedContact = isANewWatchedContact
            ? new WatchedContact(uuidFactory(), new EmailAccount(email))
            : existingWatchedContact

        if (isANewWatchedContact) events.push(new WatchedContactCreated(watchedContact.toJSON(), audit))

        watchedContact.addUser(audit.who)
        events.push(new UserWatchedContact(audit.who, watchedContact.toJSON(), audit))

        isANewWatchedContact
            ? await this.repository.create(watchedContact)
            : await this.repository.update(watchedContact)

        return events
    }
}
