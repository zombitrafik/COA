import {Controller} from "../core/annotations/ioc";
import {
    DeleteMapping,
    GetMapping,
    PostMapping, PreAuthorize, PutMapping,
    RequestBody,
    RequestMappingRoot, RequestParam,
    Response
} from "../core/annotations/http";
import DoctorSpecialtyService from "../services/doctor-specialty-service";

@Controller()
@RequestMappingRoot({value: '/doctors/specialties'})
export default class DoctorController {

    constructor(private doctorSpecialtyService: DoctorSpecialtyService) {
        this.doctorSpecialtyService = doctorSpecialtyService;
    }

    @PostMapping()
    @PreAuthorize('RECEPTIONIST')
    createDoctorSpecialty(@RequestBody() body: any, @Response() res: any) {
        return this.doctorSpecialtyService.createDoctorSpecialty(body, res);
    }

    @GetMapping()
    getAllDoctorSpecialties() {
        return this.doctorSpecialtyService.getAllDoctorSpecialties();
    }

    @PutMapping({value: '/:id'})
    @PreAuthorize('RECEPTIONIST')
    updateDoctorSpecialty(@RequestParam('id') id: string, @RequestBody() body: any, @Response() res: any) {
        return this.doctorSpecialtyService.updateDoctorSpecialty(id, body, res);
    }

    @DeleteMapping({value: '/:id'})
    @PreAuthorize('RECEPTIONIST')
    deleteDoctorSpecialty(@RequestParam('id') id: string, @Response() res: any) {
        return this.doctorSpecialtyService.deleteDoctorSpecialty(+id, res);
    }

}