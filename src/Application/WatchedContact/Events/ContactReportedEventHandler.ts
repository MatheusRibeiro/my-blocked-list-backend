import { container, inject, injectable } from 'tsyringe'
import IEventHandler from '@src/Application/Base/EventDispatcher/IEventHandler'
import ContactReported from '@src/Domain/Aggregates/Contact/DomainEvents/ContactReported'
import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import { assertIsEmail } from '@src/Domain/Base/Types/Email'
import CreateUserNotificationCommand from '@src/Application/UserNotification/Commands/CreateUserNotification'
import { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import WatchedContact from '@src/Domain/Aggregates/WatchedContact/WatchedContact'

interface GetWatchedContactParams {
    contactType: string
    contactValue: string
}

@injectable()
export default class ContactReportedEventHandler implements IEventHandler {
    protected readonly repository: IWatchedContactRepository
    protected readonly createUserNotification: CreateUserNotificationCommand

    constructor(@inject('WatchedContactRepository') repository: IWatchedContactRepository) {
        this.repository = repository
        this.createUserNotification = container.resolve(CreateUserNotificationCommand)
    }

    async handle(event: ContactReported): Promise<null> {
        const getWatchedContactParams = {
            contactType: event.contact.account.contact_type,
            contactValue: event.contact.account.value,
        }
        const watchedContact = await this.getWatchedContact(getWatchedContactParams)
        if (watchedContact === null) {
            return null
        }
        const notification = {
            authorId: event.audit.who.toJSON(),
            payload: event.getPayload(),
            userNotificationType: event.constructor.name,
        }
        const promises = watchedContact.userIds.map(async userId => {
            return await this.createUserNotification.execute(
                Object.assign({ userId: userId.toJSON() }, notification),
                event.audit.who.toJSON()
            )
        })
        await Promise.all(promises)
        return null
    }

    protected async getWatchedContact({
        contactType,
        contactValue,
    }: GetWatchedContactParams): Promise<WatchedContact | null> {
        if (contactType === 'PhoneAccount') {
            assertIsPhone(contactValue)
            return await this.repository.findByPhone(contactValue)
        }
        if (contactType === 'EmailAccount') {
            assertIsEmail(contactValue)
            return await this.repository.findByEmail(contactValue)
        }

        return null
    }
}
