import {Service} from "../core/annotations/ioc";
import DoctorRepository from "../repositories/doctor-repository";

@Service()
export default class DoctorService {

    constructor(private doctorRepository: DoctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    createDoctor(body: any, res: any) {
        //TODO validation
        return this.doctorRepository.create(body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    getAllDoctors() {
        return this.doctorRepository.getAll();
    }

    updateDoctor(id: string, body: any, res: any) {
        return this.doctorRepository.update(id, body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    deleteDoctor(id: number, res: any) {
        return this.doctorRepository.delete(id)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

}