import { container, inject, injectable } from 'tsyringe'
import type { Request, Response } from 'express'
import IController from '../Base/BaseController'
import { Controller } from '../Base/Decorators/Controller'
import { Delete, Get, Post } from '../Base/Decorators/Route'
import CreatePhoneComplaintCommand from '@src/Application/Contact/Commands/CreatePhoneComplaint'
import CreateEmailComplaintCommand from '@src/Application/Contact/Commands/CreateEmailComplaint'
import AuthenticationMiddleware from '../Middlewares/Authentication'
import LoggerMiddleware from '../Middlewares/Logger'
import IComplaintQueries, { ComplaintViewModel } from '@src/Application/Contact/Queries/IComplaintQueries'
import RemoveComplaintCommand from '@src/Application/Contact/Commands/RemoveComplaint'

@Controller('/contact')
@injectable()
export default class ContactController extends IController {
    private readonly createPhoneComplaintCommand: CreatePhoneComplaintCommand
    private readonly createEmailComplaintCommand: CreateEmailComplaintCommand
    private readonly removeComplaintCommand: RemoveComplaintCommand
    private readonly complaintQueries: IComplaintQueries

    constructor(@inject('ComplaintQueries') complaintQueries: IComplaintQueries) {
        super()
        this.createPhoneComplaintCommand = container.resolve(CreatePhoneComplaintCommand)
        this.createEmailComplaintCommand = container.resolve(CreateEmailComplaintCommand)
        this.removeComplaintCommand = container.resolve(RemoveComplaintCommand)
        this.complaintQueries = complaintQueries
        this.middlewares.push(container.resolve(LoggerMiddleware))
        this.middlewares.push(container.resolve(AuthenticationMiddleware))
    }

    @Post('/complaint/phone')
    public createByPhone = async (req: Request, res: Response): Promise<null> => {
        const { userId } = res.locals.User
        return await this.createPhoneComplaintCommand.execute(
            Object.assign({}, req.body, { userId }),
            res.locals.User.userId
        )
    }

    @Post('/complaint/email')
    public createByEmail = async (req: Request, res: Response): Promise<null> => {
        const { userId } = res.locals.User
        return await this.createEmailComplaintCommand.execute(
            Object.assign({}, req.body, { userId }),
            res.locals.User.userId
        )
    }

    @Get('/complaint/find-by-phone/:phone')
    public findByPhone = async (req: Request): Promise<ComplaintViewModel[]> => {
        const { phone } = req.params
        return await this.complaintQueries.getComplaintsFromPhone({ phone })
    }

    @Get('/complaint/find-by-email/:email')
    public findByEmail = async (req: Request): Promise<ComplaintViewModel[]> => {
        const { email } = req.params
        return await this.complaintQueries.getComplaintsFromEmail({ email })
    }

    @Delete('/:contactId/complaint/:complaintId')
    public deleteComplaint = async (req: Request, res: Response): Promise<null> => {
        const { complaintId, contactId } = req.params
        const { userId } = res.locals.User
        return await this.removeComplaintCommand.execute({ complaintId, contactId, userId }, userId)
    }
}
