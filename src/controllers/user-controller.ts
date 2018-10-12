import {Controller} from "../core/annotations/ioc";
import {
    DeleteMapping,
    GetMapping,
    PostMapping, PreAuthorize, PutMapping,
    QueryParams,
    Request,
    RequestBody,
    RequestMappingRoot, RequestParam,
    Response
} from "../core/annotations/http";
import UserService from "../services/user-service";

@Controller()
@RequestMappingRoot({value: '/users'})
export default class UserController {

    constructor(private userService: UserService) {
        this.userService = userService;
    }

    @PostMapping()
    @PreAuthorize('ADMIN')
    createUser(@RequestBody() body: any, @Response() res: any) {
        return this.userService.createUser(body, res);
    }

    @GetMapping()
    @PreAuthorize('ADMIN')
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @PutMapping({value: '/:id'})
    @PreAuthorize('ADMIN')
    updateUser(@RequestParam('id') id: string, @RequestBody() body: any, @Response() res: any) {
        return this.userService.updateUser(id, body, res);
    }

    @DeleteMapping({value: '/:id'})
    @PreAuthorize('ADMIN')
    deleteUser(@RequestParam('id') id: string, @Request() req: any, @Response() res: any) {
        //TODO auto-type convert
        return this.userService.deleteUser(+id, req, res);
    }

    @GetMapping({value: '/login'})
    login(@QueryParams() params: any, @Request() req: any, @Response() res: any) {
        return this.userService.login(params, req, res);
    }

    @GetMapping({value: '/logout'})
    //TODO accept an array
    @PreAuthorize('ADMIN')
    @PreAuthorize('USER')
    @PreAuthorize('RECEPTIONIST')
    logout(@Request() req: any) {
        delete req.session.user;
        return {}
    }

}