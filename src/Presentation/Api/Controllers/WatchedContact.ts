import { container, inject, injectable } from 'tsyringe'
import type { Request, Response } from 'express'
import IController from '../Base/BaseController'
import { Controller } from '../Base/Decorators/Controller'
import { Get, Post, Delete } from '../Base/Decorators/Route'
import WatchPhoneCommand from '@src/Application/WatchedContact/Commands/WatchPhoneContact'
import WatchEmailCommand from '@src/Application/WatchedContact/Commands/WatchEmailContact'
import AuthenticationMiddleware from '../Middlewares/Authentication'
import LoggerMiddleware from '../Middlewares/Logger'
import IWatchedContactQueries, {
    WatchedContactViewModel,
} from '@src/Application/WatchedContact/Queries/IWatchedContactQueries'
import UnwatchContactCommand from '@src/Application/WatchedContact/Commands/UnwatchContact'

@Controller('/watched-contact')
@injectable()
export default class ContactController extends IController {
    private readonly watchPhoneContactCommand: WatchPhoneCommand
    private readonly watchEmailContactCommand: WatchEmailCommand
    private readonly unwatchContactCommand: UnwatchContactCommand
    private readonly watchedContactQueries: IWatchedContactQueries

    constructor(@inject('WatchedContactQueries') watchedContactQueries: IWatchedContactQueries) {
        super()
        this.watchPhoneContactCommand = container.resolve(WatchPhoneCommand)
        this.watchEmailContactCommand = container.resolve(WatchEmailCommand)
        this.unwatchContactCommand = container.resolve(UnwatchContactCommand)
        this.watchedContactQueries = watchedContactQueries
        this.middlewares.push(container.resolve(LoggerMiddleware))
        this.middlewares.push(container.resolve(AuthenticationMiddleware))
    }

    @Post('/phone')
    public watchPhoneContact = async (req: Request, res: Response): Promise<null> => {
        return await this.watchPhoneContactCommand.execute(req.body, res.locals.User.userId)
    }

    @Post('/email')
    public watchEmailContact = async (req: Request, res: Response): Promise<null> => {
        return await this.watchEmailContactCommand.execute(req.body, res.locals.User.userId)
    }

    @Get('/')
    public getWatchedContacts = async (req: Request, res: Response): Promise<WatchedContactViewModel[]> => {
        const { userId } = res.locals.User
        return await this.watchedContactQueries.getWatchedAccounts({ userId })
    }

    @Get('/phone')
    public getWatchedPhoneContacts = async (req: Request, res: Response): Promise<WatchedContactViewModel[]> => {
        const { userId } = res.locals.User
        return await this.watchedContactQueries.getWatchedPhones({ userId })
    }

    @Get('/email')
    public getWatchedEmailContacts = async (req: Request, res: Response): Promise<WatchedContactViewModel[]> => {
        const { userId } = res.locals.User
        return await this.watchedContactQueries.getWatchedEmails({ userId })
    }

    @Delete('/:watchedContactId')
    public unwatchContact = async (req: Request, res: Response): Promise<null> => {
        const { watchedContactId } = req.params
        return await this.unwatchContactCommand.execute({ watchedContactId }, res.locals.User.userId)
    }
}
