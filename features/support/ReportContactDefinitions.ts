import 'reflect-metadata'
import { container } from 'tsyringe'
import '@src/Infrastructure/DependencyInjection'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'expect'
import CreatePhoneComplaintCommand from '@src/Application/Contact/Commands/CreatePhoneComplaint'
import CreateEmailComplaintCommand from '@src/Application/Contact/Commands/CreateEmailComplaint'
import RemoveComplaintCommand from '@src/Application/Contact/Commands/RemoveComplaint'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import ComplaintInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/ComplaintQueries'
import { ComplaintViewModel } from '@src/Application/Contact/Queries/IComplaintQueries'

interface World {
    myUserId: string
    otherUserId: string
    phone: string
    anotherPhone: string
    phoneDescription: string
    email: string
    emailDescription: string
    phoneQueryResult: ComplaintViewModel[]
    anotherPhoneQueryResult: ComplaintViewModel[][]
    emailQueryResult: ComplaintViewModel[]
}

const createEmailComplaintCommand = container.resolve(CreateEmailComplaintCommand)
const createPhoneComplaintCommand = container.resolve(CreatePhoneComplaintCommand)
const removeComplaintCommand = container.resolve(RemoveComplaintCommand)

const world: World = {
    myUserId: uuidFactory(),
    otherUserId: uuidFactory(),
    phone: '+55 9123-7654',
    anotherPhone: '+55 9876-5432',
    phoneDescription: 'any phone complaint description',
    email: 'myothertest@gmail.com',
    emailDescription: 'any email complaint description',
    phoneQueryResult: [],
    anotherPhoneQueryResult: [],
    emailQueryResult: [],
}

Given('Someone reports a phone contact', async () => {
    await createPhoneComplaintCommand.execute(
        {
            phone: world.phone,
            firstName: 'John',
            lastName: 'Doe',
            complaintCategory: 'HOAX',
            complaintSeverity: 'INFO',
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
            complaintCategory: 'SCAM',
            complaintSeverity: 'NOTICE',
            authorId: world.otherUserId,
            description: world.emailDescription,
        },
        world.otherUserId
    )
})

Given('I report a contact', async () => {
    await createPhoneComplaintCommand.execute(
        {
            phone: world.anotherPhone,
            firstName: 'John',
            lastName: 'Doe',
            complaintCategory: 'HOAX',
            complaintSeverity: 'INFO',
            authorId: world.myUserId,
            description: world.phoneDescription,
        },
        world.myUserId
    )
    await createPhoneComplaintCommand.execute(
        {
            phone: world.anotherPhone,
            firstName: 'John',
            lastName: 'Doe',
            complaintCategory: 'SPAM',
            complaintSeverity: 'WARNING',
            authorId: world.myUserId,
            description: `Another ${world.phoneDescription}`,
        },
        world.myUserId
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

When('I delete the complaints about the contact', async () => {
    const complaintQuery = new ComplaintInMemoryQueries()
    world.anotherPhoneQueryResult.push(await complaintQuery.getComplaintsFromPhone({ phone: world.anotherPhone }))
    for (const complaint of world.anotherPhoneQueryResult[0]) {
        const contactId = complaint.contact.id
        const complaintId = complaint.id
        const userId = world.myUserId
        await removeComplaintCommand.execute({ contactId, complaintId, userId }, userId)
    }
    world.anotherPhoneQueryResult.push(await complaintQuery.getComplaintsFromPhone({ phone: world.anotherPhone }))
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

Then('The contact complaints are no longer available', () => {
    const [firstResult, secondResult] = world.anotherPhoneQueryResult
    expect(firstResult.length).toBe(2)
    expect(secondResult.length).toBe(0)
})
