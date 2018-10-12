import {Controller} from "../core/annotations/ioc";
import {
    DeleteMapping,
    GetMapping,
    PostMapping, PreAuthorize, PutMapping,
    RequestBody,
    RequestMappingRoot, RequestParam,
    Response
} from "../core/annotations/http";
import DoctorService from "../services/doctor-service";

@Controller()
@RequestMappingRoot({value: '/doctors'})
export default class DoctorController {

    constructor(private doctorService: DoctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping()
    @PreAuthorize('RECEPTIONIST')
    createDoctor(@RequestBody() body: any, @Response() res: any) {
        return this.doctorService.createDoctor(body, res);
    }

    @GetMapping()
    getAllDoctors() {
        return this.doctorService.getAllDoctors();
    }

    @PutMapping({value: '/:id'})
    @PreAuthorize('RECEPTIONIST')
    updateDoctor(@RequestParam('id') id: string, @RequestBody() body: any, @Response() res: any) {
        return this.doctorService.updateDoctor(id, body, res);
    }

    @DeleteMapping({value: '/:id'})
    @PreAuthorize('RECEPTIONIST')
    deleteDoctor(@RequestParam('id') id: string, @Response() res: any) {
        return this.doctorService.deleteDoctor(+id, res);
    }

}