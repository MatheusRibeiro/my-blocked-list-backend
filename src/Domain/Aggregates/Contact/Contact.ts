import DomainError from "../../Base/DomainException"
import Entity from "../../Base/Entity"
import Email from "../../Base/ValueObject/Email"
import FullName from "../../Base/ValueObject/FullName"
import Phone from "../../Base/ValueObject/Phone"

type ContactAccount = Email|Phone

export default class Contact extends Entity {
  public readonly contactId: string
  public readonly fullName: FullName
  public readonly description: string
  public readonly accounts: ContactAccount[]

  constructor (contactId: string, fullName: FullName, description: string) {
    super()
    this.contactId = contactId
    this.fullName = fullName
    this.description = description
    this.accounts = []
  }

  public isValid(): boolean {
    return this.fullName.isValid() && this.accounts.length > 0
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
