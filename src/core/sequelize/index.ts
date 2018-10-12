import Sequelize from 'sequelize';
import Config from '../../config/config'

import models from '../../models';
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
            sequelize
        };

        Object.keys(models).forEach((modelName: string) => {
            this.db[modelName] = (<any>models)[modelName](sequelize);
        });

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
