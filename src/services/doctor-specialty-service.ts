import {Service} from "../core/annotations/ioc";
import DoctorSpecialtiesRepository from "../repositories/doctor-specialty-repository";

@Service()
export default class DoctorSpecialtyService {

    constructor(private doctorSpecialtiesRepository: DoctorSpecialtiesRepository) {
        this.doctorSpecialtiesRepository = doctorSpecialtiesRepository;
    }

    createDoctorSpecialty(body: any, res: any) {
        //TODO validation
        return this.doctorSpecialtiesRepository.create(body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    getAllDoctorSpecialties() {
        return this.doctorSpecialtiesRepository.getAll();
    }

    updateDoctorSpecialty(id: string, body: any, res: any) {
        return this.doctorSpecialtiesRepository.update(id, body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    deleteDoctorSpecialty(id: number, res: any) {
        return this.doctorSpecialtiesRepository.delete(id)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

}