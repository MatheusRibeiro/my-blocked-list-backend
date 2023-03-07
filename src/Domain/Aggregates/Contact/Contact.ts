import DomainError from "../../Base/DomainException"
import Entity from "../../Base/Entity"
import Email from "../../Base/ValueObject/Email"
import PersonName from "../../Base/ValueObject/PersonName"
import Phone from "../../Base/ValueObject/Phone"
import ContactId from "./ValueObjects/ContactId"

type ContactAccount = Email|Phone

export default class Contact extends Entity {
  public readonly contactId: ContactId
  public readonly personName: PersonName
  public readonly description: string
  public readonly account: ContactAccount

  constructor (contactId: ContactId, personName: PersonName, description: string, account: ContactAccount) {
    super()
    this.contactId = contactId
    this.personName = personName
    this.description = description
    this.account = account
  }

  public isValid(): boolean {
    return this.personName.isValid() && this.account.isValid()
  }

  public isEqual(entity: Contact): boolean {
    return this.contactId.isEqual(entity.contactId)
  }
}
