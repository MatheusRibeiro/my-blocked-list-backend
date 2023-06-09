import { container } from 'tsyringe'
import IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import JwtTokenGenerator from '@src/Infrastructure/Authentication/JwtTokenGenerator'
import AbstractAuthenticationService from '@src/Application/Services/Authentication/AbstractAuthenticationService'
import AuthenticationService from '@src/Application/Services/Authentication/AuthenticationService'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import UserInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/UserRepository'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import ContactInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/ContactRepository'
import ComplaintInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/ComplaintQueries'
import IComplaintQueries from '@src/Application/Contact/Queries/IComplaintQueries'
import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import WatchedContactInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/WatchedContactRepository'
import IWatchedContactQueries from '@src/Application/WatchedContact/Queries/IWatchedContactQueries'
import WatchedContactInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/WatchedContactQueries'
import IUserNotificationRepository from '@src/Domain/Aggregates/UserNotification/IUserNotificationRepository'
import UserNotificationInMemoryRepository from '@src/Infrastructure/Storage/InMemory/Repositories/UserNotificationRepository'
import IUserNotificationQueries from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
import UserNotificationInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/UserNotificationQueries'

container.registerSingleton<IJwtTokenGenerator>('JwtTokenGenerator', JwtTokenGenerator)
container.registerSingleton<AbstractAuthenticationService>('AuthenticationService', AuthenticationService)

container.registerSingleton<IUserRepository>('UserRepository', UserInMemoryRepository)
container.registerSingleton<IContactRepository>('ContactRepository', ContactInMemoryRepository)
container.registerSingleton<IWatchedContactRepository>('WatchedContactRepository', WatchedContactInMemoryRepository)
container.registerSingleton<IUserNotificationRepository>(
    'UserNotificationRepository',
    UserNotificationInMemoryRepository
)

container.registerSingleton<IComplaintQueries>('ComplaintQueries', ComplaintInMemoryQueries)
container.registerSingleton<IWatchedContactQueries>('WatchedContactQueries', WatchedContactInMemoryQueries)
container.registerSingleton<IUserNotificationQueries>('UserNotificationQueries', UserNotificationInMemoryQueries)
