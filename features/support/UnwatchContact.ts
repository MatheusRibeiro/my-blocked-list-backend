import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'expect'
import { container } from 'tsyringe'
import WatchPhoneContactCommand from '@src/Application/WatchedContact/Commands/WatchPhoneContact'
import UnwatchContactCommand from '@src/Application/WatchedContact/Commands/UnwatchContact'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import WatchedContactInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/WatchedContactQueries'

const watchPhoneContactCommand = container.resolve(WatchPhoneContactCommand)
const unwatchContactCommand = container.resolve(UnwatchContactCommand)
const watchedContactQueries = new WatchedContactInMemoryQueries()
const world = {
    myUserId: uuidFactory(),
    phone: '+55 9123-4567',
}

Given('I watch a contact', async () => {
    await watchPhoneContactCommand.execute(
        {
            phone: world.phone,
        },
        world.myUserId
    )
})

Then('I unwatch the contact', async () => {
    const watchedContactResult = await watchedContactQueries.getWatchedPhones({ userId: world.myUserId })
    expect(watchedContactResult.length).toBe(1)
    const [{ watched_contact_id: watchedContactId }] = watchedContactResult
    await unwatchContactCommand.execute({ watchedContactId }, world.myUserId)
})

When('My user is no longer in the watched contact list', async () => {
    const watchedContactResult = await watchedContactQueries.getWatchedPhones({ userId: world.myUserId })
    expect(watchedContactResult.length).toBe(0)
})
