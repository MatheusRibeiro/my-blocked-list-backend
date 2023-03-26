import { container } from 'tsyringe'
import IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import JwtTokenGenerator from '@src/Infrastructure/Authentication/JwtTokenGenerator'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import AuthenticationService from '@src/Application/Services/Authentication/AuthenticationService'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import UserInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/UserRepository'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import ContactInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/ContactRepository'
import ComplaintInMemoryQueries from './Storage/InMemory/Queries/ComplaintQueries'
import IComplaintQueries from '@src/Application/Contact/Queries/IComplaintQueries'
import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import WatchedContactInMemoryRepository from './Storage/InMemory/Repositories/WatchedContactRepository'
import IWatchedContactQueries from '@src/Application/WatchedContact/Queries/IWatchedContactQueries'
import WatchedContactInMemoryQueries from './Storage/InMemory/Queries/WatchedContactQueries'

container.registerSingleton<IJwtTokenGenerator>('JwtTokenGenerator', JwtTokenGenerator)
container.registerSingleton<IAuthenticationService>('AuthenticationService', AuthenticationService)

container.registerSingleton<IUserRepository>('UserRepository', UserInMemoryRepository)
container.registerSingleton<IContactRepository>('ContactRepository', ContactInMemoryRepository)
container.registerSingleton<IWatchedContactRepository>('WatchedContactRepository', WatchedContactInMemoryRepository)

container.registerSingleton<IComplaintQueries>('ComplaintQueries', ComplaintInMemoryQueries)
container.registerSingleton<IWatchedContactQueries>('WatchedContactQueries', WatchedContactInMemoryQueries)
