import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import CreateComplaintCommand from '@src/Application/Commands/CreateComplaintCommand'

export default class ComplaintController {
    private readonly createComplaintCommand: CreateComplaintCommand

    constructor() {
        this.createComplaintCommand = container.resolve(CreateComplaintCommand)
    }

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
}
