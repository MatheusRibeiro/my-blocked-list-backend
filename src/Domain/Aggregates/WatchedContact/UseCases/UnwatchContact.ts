import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import WatchedContactRemoved from '../DomainEvents/WatchedContactRemoved'
import UserUnwatchedContact from '../DomainEvents/UserUnwatchedContact'
import IWatchedContactRepository from '../IWatchedContactRepository'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UUID from '@src/Domain/Base/Types/UUID'
import AbstractWatchedContactUseCase from '../Abstractions/WatchedContactUseCase'

export interface UnwatchContactDTO {
    watchedContactId: UUID
}

type UnwatchContactEvents = UserUnwatchedContact | WatchedContactRemoved

const notFoundMessage = 'User was not found.'

@injectable()
export default class UnwatchContactUseCase extends AbstractWatchedContactUseCase<UnwatchContactDTO> {
    constructor(@inject('WatchedContactRepository') watchedContactRepository: IWatchedContactRepository) {
        super(watchedContactRepository)
    }

    public async execute(dto: UnwatchContactDTO, audit: Audit): Promise<UnwatchContactEvents[]> {
        const events: UnwatchContactEvents[] = []
        const { watchedContactId } = dto
        const watchedContact = await this.repository.findById(watchedContactId)
        if (watchedContact === null) {
            throw new NotFoundError(notFoundMessage)
        }
        const userIdRemoved = watchedContact.removeUser(audit.who)
        if (userIdRemoved === null) {
            throw new NotFoundError(notFoundMessage)
        }
        events.push(new UserUnwatchedContact(userIdRemoved.toJSON(), watchedContact.toJSON(), audit))

        if (watchedContact.userIds.length === 0) {
            await this.repository.delete(watchedContact)
            events.push(new WatchedContactRemoved(watchedContact.toJSON(), audit))
        } else {
            await this.repository.update(watchedContact)
        }

        return events
    }
}
