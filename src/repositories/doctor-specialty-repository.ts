import BaseRepository from './base-repository';
import {Repository} from "../core/annotations/ioc";
import SequelizeService from "../core/sequelize";

@Repository()
export default class DoctorSpecialtiesRepository extends BaseRepository {
    constructor(private sequelizeService: SequelizeService) {
        super(sequelizeService.getDB().DoctorSpecialty);
    }
}
