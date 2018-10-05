import db from '../models';
import BaseRepository from './base-repository';

export default class DoctorSpecialtiesRepository extends BaseRepository {
    constructor() {
        super(db.DoctorSpecialty);
    }
}
