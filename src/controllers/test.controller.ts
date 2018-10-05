import {Controller} from "../core/annotations/ioc";
import {ExpressService} from "../core/express";
import {
    GetMapping,
    QueryParam,
    QueryParams,
    RequestMappingRoot,
    RequestParam,
    RequestParams
} from "../core/annotations/http";

@Controller()
@RequestMappingRoot({value: '/test'})
export default class TestController {
    constructor() {
    }
    
    @GetMapping({value: '/api/:custom'})
    getApi(
        @RequestParams() params: any,
        @RequestParam('custom') custom: string,
        @QueryParams() queryParams: any,
        @QueryParam('query') query: string) {
        console.log(params);
        console.log(custom);
        console.log(queryParams);
        console.log(query);
        return {myOsomeJson: 'or vishe gor'};
    }
}