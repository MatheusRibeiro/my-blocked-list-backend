import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import CreateComplaintCommand from '@src/Application/Commands/CreateComplaintCommand'
import GetComplaintsFromContactQuery, { ComplaintDTO } from '@src/Application/Queries/GetComplaintsFromContactQuery'
import { Controller } from '../Base/Decorators/Controller'
import { Get, Post } from '../Base/Decorators/Route'
import IController from '../Base/BaseController'
import AuthenticationMiddleware from '../Middlewares/AuthenticationMiddleware'
import LoggerMiddleware from '../Middlewares/LoggerMiddleware'

@Controller('/complaint')
export default class ComplaintController extends IController {
    private readonly createComplaintCommand: CreateComplaintCommand
    private readonly getComplaintsFromContactQuery: GetComplaintsFromContactQuery

    constructor() {
        super()
        this.createComplaintCommand = container.resolve(CreateComplaintCommand)
        this.getComplaintsFromContactQuery = container.resolve(GetComplaintsFromContactQuery)
        this.middlewares.push(container.resolve(AuthenticationMiddleware))
        this.middlewares.push(container.resolve(LoggerMiddleware))
    }

    @Post('/create')
    public create = async (req: Request, res: Response): Promise<null> => {
        return await this.createComplaintCommand.execute(
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

    @Get('/find-by-phone/:phone')
    public findByPhone = async (req: Request): Promise<ComplaintDTO[]> => {
        return await this.getComplaintsFromContactQuery.execute({ phone: req.params.phone })
    }
}
