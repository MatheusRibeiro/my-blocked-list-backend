import DomainError from "../../Base/DomainException"
import IAccount from "./ValueObjects/IAccount"

export default class Contact {
  public readonly contactId: string
  public readonly name: string
  public readonly description: string
  public readonly accounts: IAccount[]

  constructor (contactId: string, name: string, description: string) {
    this.contactId = contactId
    this.name = name
    this.description = description
    this.accounts = []
  }

  public addAcount(account: IAccount) {
    if(!account.isValid()) {
      throw new DomainError("Invalid Account")
    }

    if(this.hasAccount(account)) {
      throw new DomainError("Duplicated account")
    }
  
    this.accounts.push(account)
  }

  private hasAccount(account: IAccount) {
    for(let addedAccount of this.accounts) {
      const isOfSameClass = account.constructor === addedAccount.constructor
      if(isOfSameClass && account.isEqual(addedAccount)) {
        return true
      }
    }
    return false
  }
}
