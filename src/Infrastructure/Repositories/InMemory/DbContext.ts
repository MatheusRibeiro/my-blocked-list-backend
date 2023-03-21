import Entity from '@src/Domain/Base/AbstractEntity'

export interface IInMemoryDbContext {
    [key: string]: Entity[]
}

const dbContext: IInMemoryDbContext = {}

export default dbContext
