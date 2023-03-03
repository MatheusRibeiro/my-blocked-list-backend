import { Request, Response } from "express"

export default (callback: Function) => async (req: Request, res: Response) => {
    try {
      const result = await callback(req)
      return res.send(JSON.stringify(result))
    } catch (error) {
      return res.status(400).send(JSON.stringify(error))
    }
  }
  