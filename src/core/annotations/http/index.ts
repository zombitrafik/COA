import {
    RequestMappingRootAnnotation,
    RequestMappingAnnotation,
    RequestParams,
    RequestParam,
    QueryParams,
    QueryParam,
    IRequestMapping, GetMappingAnnotation, PostMappingAnnotation
} from './request-mapping'

import {app} from '../../../app';

const RequestMapping = RequestMappingAnnotation;
const GetMapping = GetMappingAnnotation;
const PostMapping = PostMappingAnnotation;

const RequestMappingRoot = (params: IRequestMapping) => {
    return RequestMappingRootAnnotation(app.getExpressService(), params);
};

export {RequestMappingRoot, RequestMapping, RequestParams, GetMapping, PostMapping, RequestParam, QueryParams, QueryParam};