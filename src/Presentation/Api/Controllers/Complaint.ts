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

@Controller('/complaint')
@injectable()
export default class ComplaintController extends IController {
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

    @Post('/phone/create')
    public createByPhone = async (req: Request, res: Response): Promise<null> => {
        return await this.createPhoneComplaintCommand.execute(
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                phone: req.body.phone,
                description: req.body.description,
                complaintCategory: req.body.category,
                complaintSeverity: req.body.severity,
            },
            res.locals.User.userId
        )
    }

    @Post('/email/create')
    public createByEmail = async (req: Request, res: Response): Promise<null> => {
        return await this.createEmailComplaintCommand.execute(
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                description: req.body.description,
                complaintCategory: req.body.category,
                complaintSeverity: req.body.severity,
            },
            res.locals.User.userId
        )
    }

    @Get('/find-by-phone/:phone')
    public findByPhone = async (req: Request): Promise<ComplaintViewModel[]> => {
        return await this.complaintQueries.getComplaintsFromPhone({ phone: req.params.phone })
    }

    @Get('/find-by-email/:email')
    public findByEmail = async (req: Request): Promise<ComplaintViewModel[]> => {
        return await this.complaintQueries.getComplaintsFromEmail({ email: req.params.email })
    }

    @Delete('/:contactId/:complaintId')
    public deleteComplaint = async (req: Request, res: Response): Promise<null> => {
        const { complaintId, contactId } = req.params
        return await this.removeComplaintCommand.execute({ complaintId, contactId }, res.locals.User.userId)
    }
}
