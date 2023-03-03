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
  public readonly accounts: ContactAccount[]

  constructor (contactId: ContactId, personName: PersonName, description: string) {
    super()
    this.contactId = contactId
    this.personName = personName
    this.description = description
    this.accounts = []
  }

  public isValid(): boolean {
    return this.personName.isValid() && this.accounts.length > 0
  }

  public addAcount(account: ContactAccount): void {
    if(!account.isValid()) {
      throw new DomainError("Invalid Account")
    }

    if(this.hasAccount(account)) {
      throw new DomainError("Duplicated account")
    }
  
    this.accounts.push(account)
  }

  private hasAccount(account: ContactAccount): boolean {
    for(let addedAccount of this.accounts) {
      const isOfSameClass = account.constructor === addedAccount.constructor
      if(isOfSameClass && account.isEqual(addedAccount)) {
        return true
      }
    }
    return false
  }
}
