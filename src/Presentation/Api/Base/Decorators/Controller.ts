import { Router } from 'express'
import { container } from 'tsyringe'
import IController from '../BaseController'
import RouteDefinition from './RouteDefiniton'
import resultHandler from '../ResultHandler'

export const router = Router()

export const Controller = (prefix: string): ClassDecorator => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any) => {
        Reflect.defineMetadata('prefix', prefix, target)
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target)
        }

        const routes: RouteDefinition[] = Reflect.getMetadata('routes', target)
        const controller: IController = container.resolve(target)

        controller.middlewares.forEach(middleware => {
            router.use(middleware.execute)
        })

        routes.forEach((route: RouteDefinition) => {
            router[route.method](
                `${prefix}${route.path}`,
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                resultHandler((controller as typeof target)[route.methodName])
            )
        })
    }
}
