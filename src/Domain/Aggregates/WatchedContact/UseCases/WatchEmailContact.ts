import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import Email from '@src/Domain/Base/ValueObject/Email'
import AbstractWatchedContactUseCase from '../Abstractions/WatchedContactUseCase'
import IWatchedContactRepository from '../IWatchedContactRepository'
import WatchedContact from '../WatchedContact'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import EmailAccount from '../ValueObjects/EmailAccount'
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
            ? new WatchedContact(UUID.generate(), new EmailAccount(email))
            : existingWatchedContact

        if (isANewWatchedContact) events.push(new WatchedContactCreated(watchedContact.toJSON(), audit))

        watchedContact.addUser(audit.who)
        events.push(new UserWatchedContact(audit.who.toJSON(), watchedContact.toJSON(), audit))

        isANewWatchedContact
            ? await this.repository.create(watchedContact)
            : await this.repository.update(watchedContact)

        return events
    }
}
