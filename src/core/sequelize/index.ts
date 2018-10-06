import Sequelize from 'sequelize';
import Config from '../../config/config'

import DoctorFactory from '../../models/doctor';
import DoctorSpecialtyFactory from '../../models/doctor-specialty';
import {Service} from "../annotations/ioc";

const env = process.env.NODE_ENV || 'development';

@Service()
export default class SequelizeService {
    private db: any;
    private sequelize: Sequelize.Sequelize;
    constructor(config: Config) {
        const dbConfig = config.get(env).db;
        const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig.options);

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
    run() {
        return this.db.sequelize.sync();
    }
}
