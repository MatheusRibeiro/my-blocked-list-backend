import Entity from '@src/Domain/Base/Abstractions/Entity'

export interface IInMemoryDbContext {
    [key: string]: Entity[]
}

const dbContext: IInMemoryDbContext = {}

export default dbContext
