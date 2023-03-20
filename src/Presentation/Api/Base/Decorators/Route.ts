import RouteDefinition from './RouteDefiniton'

type HttpVerb = 'get' | 'post' | 'delete' | 'put'

export function Get(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        pushDecoratedRoute(path, 'get', target, propertyKey)
    }
}

export function Post(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        pushDecoratedRoute(path, 'post', target, propertyKey)
    }
}

export function Delete(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        pushDecoratedRoute(path, 'delete', target, propertyKey)
    }
}

export function Put(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string): void => {
        pushDecoratedRoute(path, 'put', target, propertyKey)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pushDecoratedRoute(path: string, method: HttpVerb, target: any, propertyKey: string): void {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
    routes.push({
        method,
        path,
        methodName: propertyKey,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
}
