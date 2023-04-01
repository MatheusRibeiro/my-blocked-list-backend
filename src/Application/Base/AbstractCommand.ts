import UUID, { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import Audit from '@src/Domain/Base/Audit'
import AbstractUseCase from '@src/Domain/Base/Abstractions/UseCase'
import Entity from '@src/Domain/Base/Abstractions/Entity'
import IRepository from '@src/Domain/Base/Abstractions/Repository'
import AbstractMapper from './AbstractMapper'
import IEventDispatcher from './EventDispatcher/IEventDispatcher'

export default abstract class AbstractCommand<
    RequestData,
    UseCaseInput,
    TEntity extends Entity,
    TId extends UUID,
    TRepository extends IRepository<TEntity, TId>,
    UseCase extends AbstractUseCase<UseCaseInput, TEntity, TId, TRepository>
> {
    protected readonly useCase: UseCase
    protected readonly inputMapper: AbstractMapper<RequestData, UseCaseInput>
    protected readonly eventDispatcher: IEventDispatcher | undefined

    constructor(useCase: UseCase, inputMapper: AbstractMapper<RequestData, UseCaseInput>) {
        this.useCase = useCase
        this.inputMapper = inputMapper
    }

    public execute = async (request: RequestData, authorId: string): Promise<null> => {
        assertIsUUID(authorId)
        const audit = new Audit(authorId)
        const events = await this.useCase.execute(this.inputMapper(request), audit)
        if (this.eventDispatcher !== undefined) {
            const promises = events.map(this.eventDispatcher.notify)
            await Promise.all(promises)
        }
        return null
    }
}
