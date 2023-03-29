import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import AbstractWatchedContactUseCase from '../Abstractions/WatchedContactUseCase'
import IWatchedContactRepository from '../IWatchedContactRepository'
import WatchedContact from '../WatchedContact'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import PhoneAccount from '../../Contact/ValueObjects/PhoneAccount'
import UserWatchedContact from '../DomainEvents/UserWatchedContact'
import WatchedContactCreated from '../DomainEvents/WatchedContactCreated'

export interface WatchPhoneContactDTO {
    phone: Phone
}

type WatchPhoneContactEvents = UserWatchedContact | WatchedContactCreated

@injectable()
export default class WatchPhoneContactUseCase extends AbstractWatchedContactUseCase<WatchPhoneContactDTO> {
    constructor(@inject('WatchedContactRepository') WatchedContactRepository: IWatchedContactRepository) {
        super(WatchedContactRepository)
    }

    public async execute(dto: WatchPhoneContactDTO, audit: Audit): Promise<WatchPhoneContactEvents[]> {
        const { phone } = dto
        const events: WatchPhoneContactEvents[] = []

        const existingWatchedContact = await this.repository.findByPhone(phone)
        const isANewWatchedContact = existingWatchedContact === null

        const watchedContact = isANewWatchedContact
            ? new WatchedContact(uuidFactory(), new PhoneAccount(phone))
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
