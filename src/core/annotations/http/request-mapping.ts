import {ExpressService} from "../../express";
import 'reflect-metadata';
import {RequestHandler} from "express";

const routesMetadataKey = Symbol('routes');
const requestParamsMetadataKey = Symbol('requestParams');
const requestParamMetadataKey = Symbol('requestParam');
const queryParamsMetadataKey = Symbol('queryParams');
const queryParamMetadataKey = Symbol('queryParam');

enum RequestMethod {
    POST, GET
}

export interface IRequestMapping {
    value: string;
    method?: RequestMethod
}

export function RequestMappingRootAnnotation(expressService: ExpressService, params: IRequestMapping) {
    return function (target: Function) {
        const routesMetadata = Reflect.getOwnMetadata(routesMetadataKey, target.prototype) || [];
        const router = expressService.createRouter();

        routesMetadata.forEach((routeMetadata: any) => {

            function requestCallback(req: any, res: any) {
                const method = routeMetadata.descriptor.value;

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

                const result = method.apply(method, args);
                if(result instanceof Promise) {
                    result.then(res.json.bind(res)).catch(res.json.bind(res));
                } else {
                    res.json(result);
                }
            }

            switch (routeMetadata.params.method) {
                case RequestMethod.GET: {
                    router.get(routeMetadata.params.value, requestCallback);
                    break;
                }
                case RequestMethod.POST: {
                    router.post(routeMetadata.params.value, requestCallback);
                    break;
                }
                default: {
                    router.get(routeMetadata.params.value, requestCallback);
                }
            }

        });

        expressService.use(params.value, router);
    }
}

export function RequestMappingAnnotation (params: IRequestMapping) {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        let routes  = Reflect.getOwnMetadata(routesMetadataKey, target) || [];
        routes.push({params, descriptor, target, propertyName});
        Reflect.defineMetadata(routesMetadataKey, routes, target);
    }
}

export function GetMappingAnnotation(params: IRequestMapping) {
    params.method = RequestMethod.GET;
    return RequestMappingAnnotation(params);
}

export function PostMappingAnnotation(params: IRequestMapping) {
    params.method = RequestMethod.POST;
    return RequestMappingAnnotation(params);
}


/**
 * Property annotation
 * @returns {(target: Object, propertyKey: (string | symbol), parameterIndex: number) => void}
 * @constructor
 */

export function RequestParams() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let requestParams = Reflect.getOwnMetadata(requestParamsMetadataKey, target) || [];
        requestParams.push(parameterIndex);
        Reflect.defineMetadata(requestParamsMetadataKey, requestParams, target, propertyKey);
    }
}

export function RequestParam(param: string) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let requestParam = Reflect.getOwnMetadata(requestParamMetadataKey, target) || [];
        requestParam.push({parameterIndex, param});
        Reflect.defineMetadata(requestParamMetadataKey, requestParam, target, propertyKey);
    }
}

export function QueryParams() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let requestParam = Reflect.getOwnMetadata(queryParamsMetadataKey, target) || [];
        requestParam.push(parameterIndex);
        Reflect.defineMetadata(queryParamsMetadataKey, requestParam, target, propertyKey);
    }
}

export function QueryParam(param: string) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let requestParam = Reflect.getOwnMetadata(queryParamMetadataKey, target) || [];
        requestParam.push({parameterIndex, param});
        Reflect.defineMetadata(queryParamMetadataKey, requestParam, target, propertyKey);
    }
}