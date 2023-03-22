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
import IComplaintQueries from '@src/Application/Queries/IComplaintQueries'

container.registerSingleton<IJwtTokenGenerator>('JwtTokenGenerator', JwtTokenGenerator)
container.registerSingleton<IAuthenticationService>('AuthenticationService', AuthenticationService)

container.registerSingleton<IUserRepository>('UserRepository', UserInMemoryRepository)
container.registerSingleton<IContactRepository>('ContactRepository', ContactInMemoryRepository)

container.registerSingleton<IComplaintQueries>('ComplaintQueries', ComplaintInMemoryQueries)
