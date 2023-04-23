import 'reflect-metadata'
import { container } from 'tsyringe'
import '@src/Infrastructure/DependencyInjection'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'expect'
import CreateUserNotificationCommand from '@src/Application/UserNotification/Commands/CreateUserNotification'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/UserNotificationQueries'
import { UserNotificationViewModel } from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
import { UserNotificatonPayload } from '@src/Domain/Aggregates/UserNotification/UserNotification'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import MarkUserNotificationAsReadCommand from '@src/Application/UserNotification/Commands/MarkUserNotificationAsRead'

interface World {
    phone: Phone
    phoneDescription: string
    myUserId: string
    otherUserId: string
    notification: UserNotificationViewModel | null
}

const createUserNotificationCommand = container.resolve(CreateUserNotificationCommand)
const markUserNotificationAsReadCommand = container.resolve(MarkUserNotificationAsReadCommand)

const world: World = {
    phone: new Phone('+55 9123-4567'),
    phoneDescription: 'Phone complaint for behaviour test',
    myUserId: UUID.generate().getValue(),
    otherUserId: UUID.generate().getValue(),
    notification: null,
}

const payload: UserNotificatonPayload = {
    complaint: {
        id: UUID.generate().getValue(),
        description: 'Any complaint for behaviour test',
        type: {
            category: 'HOAX',
            severity: 'WARNING',
        },
        author: { id: world.otherUserId },
    },
    contact: {
        id: UUID.generate().getValue(),
        name: { first_name: 'John', last_name: '' },
        account: { contact_type: 'Phone', value: world.phone.getValue() },
        complaints: [],
    },
}
const userNotificationQueries = new UserNotificationInMemoryQueries()

Given('I received a notification about a watched contact', async () => {
    await createUserNotificationCommand.execute(
        {
            userId: world.myUserId,
            authorId: world.otherUserId,
            payload,
            userNotificationType: 'ContactReported',
        },
        world.otherUserId
    )
})

When('I read the notification', async () => {
    const [notification] = await userNotificationQueries.getUserNotifications({ userId: world.myUserId })
    expect(notification.isRead).toBeFalsy()
    world.notification = notification

    const userNotificationId = notification.id
    await markUserNotificationAsReadCommand.execute({ userNotificationId }, world.myUserId)
})

Then('The notification is marked as read', async () => {
    const { notification } = world
    if (notification === null) {
        // error
        return expect(true).toBeFalsy()
    }
    const [readNotification] = await userNotificationQueries.getUserNotifications({ userId: world.myUserId })
    if (readNotification === null) {
        // error
        return expect(true).toBeFalsy()
    }
    expect(notification.id).toBe(readNotification.id)
    expect(readNotification.isRead).toBeTruthy()
})
