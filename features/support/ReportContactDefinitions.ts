import 'reflect-metadata'
import { container } from 'tsyringe'
import '@src/Infrastructure/DependencyInjection'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'expect'
import CreatePhoneComplaintCommand from '@src/Application/Contact/Commands/CreatePhoneComplaint'
import CreateEmailComplaintCommand from '@src/Application/Contact/Commands/CreateEmailComplaint'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import ComplaintInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/ComplaintQueries'
import { ComplaintViewModel } from '@src/Application/Contact/Queries/IComplaintQueries'

interface World {
    myUserId: string
    otherUserId: string
    phone: string
    phoneDescription: string
    email: string
    emailDescription: string
    phoneQueryResult: ComplaintViewModel[]
    emailQueryResult: ComplaintViewModel[]
}

const createEmailComplaintCommand = container.resolve(CreateEmailComplaintCommand)
const createPhoneComplaintCommand = container.resolve(CreatePhoneComplaintCommand)

const world: World = {
    myUserId: uuidFactory(),
    otherUserId: uuidFactory(),
    phone: '+55 9123-7654',
    phoneDescription: 'any phone complaint description',
    email: 'myothertest@gmail.com',
    emailDescription: 'any email complaint description',
    phoneQueryResult: [],
    emailQueryResult: [],
}

Given('Someone reports a phone contact', async () => {
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

Given('Someone reports an email contact', async () => {
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

When('I search for the phone contact', async () => {
    const complaintQuery = new ComplaintInMemoryQueries()
    world.phoneQueryResult = await complaintQuery.getComplaintsFromPhone({ phone: world.phone })
})

When('I search for the email contact', async () => {
    const complaintQuery = new ComplaintInMemoryQueries()
    world.emailQueryResult = await complaintQuery.getComplaintsFromEmail({ email: world.email })
})

Then('The reported phone contact is found', () => {
    expect(world.phoneQueryResult.length).toBe(1)

    const [reported] = world.phoneQueryResult
    expect(reported.description).toBe(world.phoneDescription)
})

Then('The reported email contact is found', () => {
    expect(world.emailQueryResult.length).toBe(1)

    const [reported] = world.emailQueryResult
    expect(reported.description).toBe(world.emailDescription)
})
