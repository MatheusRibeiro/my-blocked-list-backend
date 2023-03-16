import { container } from 'tsyringe'
import IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import JwtTokenGenerator from '@src/Infrastructure/Authentication/JwtTokenGenerator'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import AuthenticationService from '@src/Application/Services/Authentication/AuthenticationService'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import UserInMemoryRepository from '@src/Infrastructure/Repositories/InMemory/UserRepository'
import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import ComplaintInMemoryRepository from '@src/Infrastructure/Repositories/InMemory/ComplaintRepository'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import ContactInMemoryRepository from '@src/Infrastructure/Repositories/InMemory/ContactRepository'
import IComplaintQueryRepository from '@src/Application/Queries/IComplaintQueryRespository'
import ComplaintQueryInMemoryRepository from '@src/Infrastructure/Repositories/InMemory/ComplaintQueryRepository'

container.registerSingleton<IJwtTokenGenerator>('JwtTokenGenerator', JwtTokenGenerator)
container.registerSingleton<IAuthenticationService>('AuthenticationService', AuthenticationService)

container.registerSingleton<IUserRepository>('UserRepository', UserInMemoryRepository)
container.registerSingleton<IComplaintRepository>('ComplaintRepository', ComplaintInMemoryRepository)
container.registerSingleton<IContactRepository>('ContactRepository', ContactInMemoryRepository)

container.registerSingleton<IComplaintQueryRepository>('ComplaintQueryRepository', ComplaintQueryInMemoryRepository)
