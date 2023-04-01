import 'reflect-metadata'
import { container } from 'tsyringe'
import '@src/Infrastructure/DependencyInjection'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'expect'
import WatchEmaiContactCommand from '@src/Application/WatchedContact/Commands/WatchEmailContact'
import WatchPhoneContactCommand from '@src/Application/WatchedContact/Commands/WatchPhoneContact'
import CreatePhoneComplaintCommand from '@src/Application/Contact/Commands/CreatePhoneComplaint'
import CreateEmailComplaintCommand from '@src/Application/Contact/Commands/CreateEmailComplaint'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import UserNotificationInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/UserNotificationQueries'
import { UserNotificationViewModel } from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
interface World {
    phone: string
    phoneDescription: string
    email: string
    emailDescription: string
    myUserId: string
    otherUserId: string
}

const createEmailComplaintCommand = container.resolve(CreateEmailComplaintCommand)
const createPhoneComplaintCommand = container.resolve(CreatePhoneComplaintCommand)

const watchEmailCommand = container.resolve(WatchEmaiContactCommand)
const watchPhoneCommand = container.resolve(WatchPhoneContactCommand)

const world: World = {
    phone: '+55 9123-4567',
    phoneDescription: 'Phone complaint for behaviour test',
    email: 'mytest@gmail.com',
    emailDescription: 'Email complaint for behaviour test',
    myUserId: uuidFactory(),
    otherUserId: uuidFactory(),
}

Given('I subscribe for notifications about a phone contact', async () => {
    await watchPhoneCommand.execute({ phone: world.phone }, world.myUserId)
})

Given('I subscribe for notifications about a email contact', async () => {
    await watchEmailCommand.execute({ email: world.email }, world.myUserId)
})

When('Someone reports the phone contact', async () => {
    await createPhoneComplaintCommand.execute(
        {
            phone: world.phone,
            firstName: 'John',
            lastName: 'Doe',
            complaintCategory: 4,
            complaintSeverity: 2,
            authorId: world.otherUserId,
            description: world.phoneDescription,
        },
        world.otherUserId
    )
})

When('Someone reports the email contact', async () => {
    await createEmailComplaintCommand.execute(
        {
            email: world.email,
            firstName: 'Mary',
            lastName: 'Doe',
            complaintCategory: 4,
            complaintSeverity: 2,
            authorId: world.otherUserId,
            description: world.emailDescription,
        },
        world.otherUserId
    )
})

Then('I receive a notification about the phone complaint', async () => {
    const userNotificationQueries = new UserNotificationInMemoryQueries()
    const notifications = await userNotificationQueries.getUserNotifications({ userId: world.myUserId })
    const accountNotifications = notifications.filter(notification =>
        isNotificationFromAccount(notification, 'PhoneAccount', world.phone)
    )

    expect(accountNotifications.length).toBe(1)
    const [notification] = accountNotifications
    expect(notification.payload.complaint.author.id).toBe(world.otherUserId)
    expect(notification.payload.complaint.description).toBe(world.phoneDescription)
})

Then('I receive a notification about the email complaint', async () => {
    const userNotificationQueries = new UserNotificationInMemoryQueries()
    const notifications = await userNotificationQueries.getUserNotifications({ userId: world.myUserId })
    const accountNotifications = notifications.filter(notification =>
        isNotificationFromAccount(notification, 'EmailAccount', world.email)
    )

    expect(accountNotifications.length).toBe(1)
    const [notification] = accountNotifications
    expect(notification.payload.complaint.author.id).toBe(world.otherUserId)
    expect(notification.payload.complaint.description).toBe(world.emailDescription)
})

function isNotificationFromAccount(
    notification: UserNotificationViewModel,
    accountType: string,
    accountValue: string
): boolean {
    const { account } = notification.payload.contact
    return account.contact_type === accountType && account.value === accountValue
}
