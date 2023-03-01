export default interface IAccount {
    isValid(): boolean
    isEqual(account: IAccount): boolean
}
