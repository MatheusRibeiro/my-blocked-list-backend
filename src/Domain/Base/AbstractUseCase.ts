import Audit from './Audit'
import DomainEvent from './AbstractDomainEvent'

export default abstract class UseCase<DTO> {
    abstract execute(dto: DTO, audit: Audit): Promise<Array<DomainEvent<object>>>
}
