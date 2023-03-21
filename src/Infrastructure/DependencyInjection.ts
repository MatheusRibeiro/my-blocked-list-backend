import { container } from 'tsyringe'
import IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import JwtTokenGenerator from '@src/Infrastructure/Authentication/JwtTokenGenerator'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import AuthenticationService from '@src/Application/Services/Authentication/AuthenticationService'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import UserInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/UserRepository'
import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import ComplaintInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/ComplaintRepository'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import ContactInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/ContactRepository'
import ComplaintInMemoryQuery from './Storage/InMemory/Queries/ComplaintQuery'
import IComplaintQuery from '@src/Application/Queries/IComplaintQuery'

container.registerSingleton<IJwtTokenGenerator>('JwtTokenGenerator', JwtTokenGenerator)
container.registerSingleton<IAuthenticationService>('AuthenticationService', AuthenticationService)

container.registerSingleton<IUserRepository>('UserRepository', UserInMemoryRepository)
container.registerSingleton<IComplaintRepository>('ComplaintRepository', ComplaintInMemoryRepository)
container.registerSingleton<IContactRepository>('ContactRepository', ContactInMemoryRepository)

container.registerSingleton<IComplaintQuery>('ComplaintQuery', ComplaintInMemoryQuery)
