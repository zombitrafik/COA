import {
    RequestMappingRootAnnotation,
    RequestMappingAnnotation,
    RequestParams,
    RequestParam,
    QueryParams,
    QueryParam,
    RequestBody,
    PreAuthorize,
    Request,
    Response,
    IRequestMapping,
    GetMappingAnnotation,
    PostMappingAnnotation,
    PutMappingAnnotation,
    DeleteMappingAnnotation
} from './request-mapping'

import {app} from '../../../app';

const RequestMapping = RequestMappingAnnotation;
const GetMapping = GetMappingAnnotation;
const PostMapping = PostMappingAnnotation;
const PutMapping = PutMappingAnnotation;
const DeleteMapping = DeleteMappingAnnotation;

const RequestMappingRoot = (params: IRequestMapping) => {
    return RequestMappingRootAnnotation(app.getExpressService(), app.context.getContainer(), params);
};

export {RequestMappingRoot, RequestMapping, RequestParams, GetMapping, PostMapping, RequestParam, QueryParams, QueryParam, RequestBody, PreAuthorize, Request, Response, PutMapping, DeleteMapping};