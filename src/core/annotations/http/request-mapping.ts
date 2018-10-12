import {ExpressService} from "../../express";
import 'reflect-metadata';
import {RequestHandler} from "express";
import {Func} from "continuation-local-storage";
import IoCContainer from "../ioc/container";
import {root} from "rxjs/internal/util/root";

const routesMetadataKey = Symbol('routes');
const requestParamsMetadataKey = Symbol('requestParams');
const requestParamMetadataKey = Symbol('requestParam');
const queryParamsMetadataKey = Symbol('queryParams');
const queryParamMetadataKey = Symbol('queryParam');
const requestBodyMetadataKey = Symbol('requestBody');
const requestMetadataKey = Symbol('request');
const responseMetadataKey = Symbol('response');

const rolesMetadataKey = Symbol('roles');

enum RequestMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export interface IRequestMapping {
    value: string;
    method?: RequestMethod
}

export function RequestMappingRootAnnotation(expressService: ExpressService, container: IoCContainer, params: IRequestMapping) {
    return function <T extends {new(...args:any[]):{}}>(target: T) {
        const routesMetadata = Reflect.getMetadata(routesMetadataKey, target.prototype) || [];
        const router = expressService.createRouter();

        const rootRolesMeta = Reflect.getMetadata(rolesMetadataKey, target) || null;

        routesMetadata.forEach((routeMetadata: any) => {

            function requestCallback(req: any, res: any) {
                let args: any[] = [];

                const requestParams: number[] = Reflect.getOwnMetadata(requestParamsMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(requestParams) {
                    requestParams.forEach((index) => {
                        args[index] = req.params;
                    });
                }

                const requestParam: number[] = Reflect.getOwnMetadata(requestParamMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(requestParam) {
                    requestParam.forEach((requestParamMetadata: any) => {
                        args[requestParamMetadata.parameterIndex] = req.params[requestParamMetadata.param];
                    });
                }

                const queryParams: number[] = Reflect.getOwnMetadata(queryParamsMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(queryParams) {
                    queryParams.forEach((index) => {
                        args[index] = req.query;
                    });
                }

                const queryParam: number[] = Reflect.getOwnMetadata(queryParamMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(queryParam) {
                    queryParam.forEach((queryParamMeta: any) => {
                        args[queryParamMeta.parameterIndex] = req.query[queryParamMeta.param];
                    });
                }

                const requestBody: number[] = Reflect.getOwnMetadata(requestBodyMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(requestBody) {
                    requestBody.forEach((index) => {
                        args[index] = req.body;
                    })
                }

                const request: number[] = Reflect.getOwnMetadata(requestMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(request) {
                    request.forEach((index) => {
                        args[index] = req;
                    })
                }

                const response: number[] = Reflect.getOwnMetadata(responseMetadataKey, routeMetadata.target, routeMetadata.propertyName);
                if(response) {
                    response.forEach((index) => {
                        args[index] = res;
                    })
                }

                const method = routeMetadata.descriptor.value;
                const result = method.apply(container.get(target.name), args);

                if(typeof result.then === 'function') {
                    result
                        .then(res.json.bind(res))
                        .catch(res.json.bind(res));
                } else {
                    res.json(result);
                }
            }

            const rolesMetadata = Reflect.getOwnMetadata(rolesMetadataKey, routeMetadata.target, routeMetadata.propertyName) || null;

            const rolesMapper = (roleMetadata: any) => roleMetadata.role;

            function preAuthorize(rolesMeta: Array<any> | null) {
                return function (req: any, res: any, next: Function) {
                    if(rolesMeta) {
                        if(req.session.user) {
                            const roles = rolesMeta.map(rolesMapper);
                            if(roles.indexOf(req.session.user.role) > -1) {
                                next();
                            } else {
                                res.statusCode = 403;
                                res.json({error: 'Permission denied'});
                            }
                        } else {
                            res.statusCode = 401;
                            res.json({error: 'Authorization required'});
                        }
                    } else {
                        next();
                    }
                }
            }

            const routePreAuthorize = preAuthorize(rolesMetadata);
            const rootPreAuthorize = preAuthorize(rootRolesMeta);

            router.use(rootPreAuthorize);

            console.log('Register mapping: ', routeMetadata.params.method, params.value + routeMetadata.params.value);

            switch (routeMetadata.params.method) {
                case RequestMethod.GET: {
                    router.get(routeMetadata.params.value, routePreAuthorize, requestCallback);
                    break;
                }
                case RequestMethod.POST: {
                    router.post(routeMetadata.params.value, routePreAuthorize, requestCallback);
                    break;
                }
                case RequestMethod.PUT: {
                    router.put(routeMetadata.params.value, routePreAuthorize, requestCallback);
                    break;
                }
                case RequestMethod.DELETE: {
                    router.delete(routeMetadata.params.value, routePreAuthorize, requestCallback);
                    break;
                }
                default: {
                    router.get(routeMetadata.params.value, routePreAuthorize, requestCallback);
                }
            }

        });

        expressService.use(params.value, router);

        return class extends target {};
    }
}

export function RequestMappingAnnotation (params: IRequestMapping) {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        let routes  = Reflect.getOwnMetadata(routesMetadataKey, target) || [];
        routes.push({params, descriptor, target, propertyName});
        Reflect.defineMetadata(routesMetadataKey, routes, target);
    }
}

export function GetMappingAnnotation(params?: IRequestMapping) {
    const {method = RequestMethod.GET, value = ''} = params || {};
    return RequestMappingAnnotation({method, value});
}

export function PostMappingAnnotation(params?: IRequestMapping) {
    const {method = RequestMethod.POST, value = ''} = params || {};
    return RequestMappingAnnotation({method, value});
}

export function PutMappingAnnotation(params?: IRequestMapping) {
    const {method = RequestMethod.PUT, value = ''} = params || {};
    return RequestMappingAnnotation({method, value});
}

export function DeleteMappingAnnotation(params?: IRequestMapping) {
    const {method = RequestMethod.DELETE, value = ''} = params || {};
    return RequestMappingAnnotation({method, value});
}


/**
 * Property annotation
 * @returns {(target: Object, propertyKey: (string | symbol), parameterIndex: number) => void}
 * @constructor
 */

export function RequestParams() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParams = Reflect.getOwnMetadata(requestParamsMetadataKey, target) || [];
        requestParams.push(parameterIndex);
        Reflect.defineMetadata(requestParamsMetadataKey, requestParams, target, propertyKey);
    }
}

export function RequestParam(param: string) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(requestParamMetadataKey, target) || [];
        requestParam.push({parameterIndex, param});
        Reflect.defineMetadata(requestParamMetadataKey, requestParam, target, propertyKey);
    }
}

export function QueryParams() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(queryParamsMetadataKey, target) || [];
        requestParam.push(parameterIndex);
        Reflect.defineMetadata(queryParamsMetadataKey, requestParam, target, propertyKey);
    }
}

export function QueryParam(param: string) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(queryParamMetadataKey, target) || [];
        requestParam.push({parameterIndex, param});
        Reflect.defineMetadata(queryParamMetadataKey, requestParam, target, propertyKey);
    }
}

export function RequestBody () {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(requestBodyMetadataKey, target) || [];
        requestParam.push(parameterIndex);
        Reflect.defineMetadata(requestBodyMetadataKey, requestParam, target, propertyKey);
    }
}

export function Request() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(requestMetadataKey, target) || [];
        requestParam.push(parameterIndex);
        Reflect.defineMetadata(requestMetadataKey, requestParam, target, propertyKey);
    }
}

export function Response() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const requestParam = Reflect.getOwnMetadata(responseMetadataKey, target) || [];
        requestParam.push(parameterIndex);
        Reflect.defineMetadata(responseMetadataKey, requestParam, target, propertyKey);
    }
}


/* Pre-authorize */

export function PreAuthorize(role: string) {
    return function <T extends {new(...args:any[]):{}}>(target: T | any, propertyKey: string = null, descriptor: TypedPropertyDescriptor<(...args: any) => void> = null) {
        let roles  = Reflect.getOwnMetadata(rolesMetadataKey, target) || [];
        roles.push({role, target, propertyKey});
        if(propertyKey !== null) {
            Reflect.defineMetadata(rolesMetadataKey, roles, target, propertyKey);
            return target.prototype;
        } else {
            Reflect.defineMetadata(rolesMetadataKey, roles, target);
            return class extends target {}
        }
    }
}
