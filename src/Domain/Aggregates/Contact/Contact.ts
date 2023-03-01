import DomainError from "../../Base/DomainException"
import Email from "../../Base/ValueObject/Email"
import FullName from "../../Base/ValueObject/FullName"
import Phone from "../../Base/ValueObject/Phone"

type IAccount = Email|Phone

export default class Contact {
  public readonly contactId: string
  public readonly fullName: FullName
  public readonly description: string
  public readonly accounts: IAccount[]

  constructor (contactId: string, fullName: FullName, description: string) {
    this.contactId = contactId
    this.fullName = fullName
    this.description = description
    this.accounts = []
  }

  public addAcount(account: IAccount): void {
    if(!account.isValid()) {
      throw new DomainError("Invalid Account")
    }

    if(this.hasAccount(account)) {
      throw new DomainError("Duplicated account")
    }
  
    this.accounts.push(account)
  }

  private hasAccount(account: IAccount): boolean {
    for(let addedAccount of this.accounts) {
      const isOfSameClass = account.constructor === addedAccount.constructor
      if(isOfSameClass && account.isEqual(addedAccount)) {
        return true
      }
    }
    return false
  }
}
