import Sequelize from 'sequelize';
import config from '../../config/config'

import DoctorFactory from '../../models/doctor';
import DoctorSpecialtyFactory from '../../models/doctor-specialty';
import {Service} from "../annotations/ioc";

@Service()
export default class SequelizeService {
    private db: any;
    private sequelize: Sequelize.Sequelize;
    constructor() {
        const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

        this.db = {
            sequelize,
            Doctor: DoctorFactory(sequelize),
            DoctorSpecialty: DoctorSpecialtyFactory(sequelize)
        };

        Object.values(this.db).forEach((model: any) => {
            if (model.associate) {
                model.associate(this.db);
            }
        });
    }
    getDB() {
        return this.db;
    }
}
