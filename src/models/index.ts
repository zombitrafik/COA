import Sequelize from 'sequelize';
import config from '../config/config'

import DoctorFactory from './doctor';
import DoctorSpecialtyFactory from './doctor-specialty';

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

const db = {
    sequelize,
    Sequelize,
    Doctor: DoctorFactory(sequelize),
    DoctorSpecialty: DoctorSpecialtyFactory(sequelize)
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
