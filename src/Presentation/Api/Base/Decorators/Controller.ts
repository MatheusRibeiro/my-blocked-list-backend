import { Router } from 'express'
import { container } from 'tsyringe'
import BaseController from '../BaseController'
import RouteDefinition from './RouteDefiniton'
import resultHandler from '../ResultHandler'

export const router = Router()

export const Controller = (routePrefix: string): ClassDecorator => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (targetDecorated: any) => {
        Reflect.defineMetadata('prefix', routePrefix, targetDecorated)
        if (!Reflect.hasMetadata('routes', targetDecorated)) {
            Reflect.defineMetadata('routes', [], targetDecorated)
        }

        const routes: RouteDefinition[] = Reflect.getMetadata('routes', targetDecorated)
        const instance = container.resolve(targetDecorated)

        if (instance instanceof BaseController) {
            instance.middlewares.forEach(middleware => {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                router.use(middleware.execute)
            })
        }

        routes.forEach(({ method, methodName, path }: RouteDefinition) => {
            router[method](
                `${routePrefix}${path}`,
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                resultHandler((instance as typeof targetDecorated)[methodName])
            )
        })
    }
}
