import db from '../models';
import BaseRepository from './base-repository';

export default class DoctorRepository extends BaseRepository {
    constructor() {
        super(db.Doctor);
    }
}