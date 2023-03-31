import 'reflect-metadata'
import { container } from 'tsyringe'
import '@src/Infrastructure/DependencyInjection'
import { Given, When, Then } from '@cucumber/cucumber'
import CreatePhoneComplaintCommand from '@src/Application/Contact/Commands/CreatePhoneComplaint'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import ComplaintInMemoryQueries from '@src/Infrastructure/Storage/InMemory/Queries/ComplaintQueries'
import { ComplaintViewModel } from '@src/Application/Contact/Queries/IComplaintQueries'

// const createEmailComplaintCommand = container.resolve(CreateEmailComplaintCommand)
const createPhoneComplaintCommand = container.resolve(CreatePhoneComplaintCommand)
function steps(world: { queryResult: ComplaintViewModel[] | null }): void {
    Given('Someone reports a phone contact', async () => {
        const userId = uuidFactory()
        await createPhoneComplaintCommand.execute(
            {
                phone: '+55 9123-4567',
                firstName: 'John',
                lastName: 'Doe',
                complaintCategory: 4,
                complaintSeverity: 2,
                authorId: userId.value,
                description: 'Spam',
            },
            userId.value
        )
    })

    When('I search for the phone contact', async () => {
        const complaintQuery = new ComplaintInMemoryQueries()
        world.queryResult = await complaintQuery.getComplaintsFromPhone({ phone: '+55 9123-4567' })
    })

    Then('The reported contact is found', () => {
        return world.queryResult !== null
    })
}

steps({ queryResult: null })
