import { container, inject, injectable } from 'tsyringe'
import type { Request, Response } from 'express'
import IController from '../Base/BaseController'
import { Controller } from '../Base/Decorators/Controller'
import { Get, Post, Delete } from '../Base/Decorators/Route'
import AuthenticationMiddleware from '../Middlewares/Authentication'
import LoggerMiddleware from '../Middlewares/Logger'
import IUserNotificationQueries, {
    UserNotificationViewModel,
} from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
import DeleteUserNotificationCommand from '@src/Application/UserNotification/Commands/DeleteUserNotification'
import MarkUserNotificationAsReadCommand from '@src/Application/UserNotification/Commands/MarkUserNotificationAsRead'

@Controller('/user-notification')
@injectable()
export default class ContactController extends IController {
    private readonly markUserNotificationAsReadCommand: MarkUserNotificationAsReadCommand
    private readonly deleteUserNotificationCommand: DeleteUserNotificationCommand
    private readonly userNotificationQueries: IUserNotificationQueries

    constructor(@inject('UserNotificationQueries') userNotificationQueries: IUserNotificationQueries) {
        super()
        this.markUserNotificationAsReadCommand = container.resolve(MarkUserNotificationAsReadCommand)
        this.deleteUserNotificationCommand = container.resolve(DeleteUserNotificationCommand)
        this.userNotificationQueries = userNotificationQueries
        this.middlewares.push(container.resolve(LoggerMiddleware))
        this.middlewares.push(container.resolve(AuthenticationMiddleware))
    }

    @Get('/')
    public getUserNotifications = async (req: Request, res: Response): Promise<UserNotificationViewModel[]> => {
        const { userId } = res.locals.User
        return await this.userNotificationQueries.getUserNotifications({ userId })
    }

    @Post('/read')
    public markUserNotificationAsRead = async (req: Request, res: Response): Promise<null> => {
        return await this.markUserNotificationAsReadCommand.execute(req.body, res.locals.User.userId)
    }

    @Delete('/:userNotificationId')
    public deleteUserNotification = async (req: Request, res: Response): Promise<null> => {
        const { userNotificationId } = req.params
        return await this.deleteUserNotificationCommand.execute({ userNotificationId }, res.locals.User.userId)
    }
}
