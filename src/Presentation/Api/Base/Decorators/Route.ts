import RouteDefinition from './RouteDefiniton'

export function Get(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
        routes.push({
            method: 'get',
            path,
            methodName: propertyKey,
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}

export function Post(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
        routes.push({
            method: 'post',
            path,
            methodName: propertyKey,
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}

export function Delete(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
        routes.push({
            method: 'delete',
            path,
            methodName: propertyKey,
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}

export function Put(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
        routes.push({
            method: 'put',
            path,
            methodName: propertyKey,
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}
