import {Service} from "../core/annotations/ioc";

const path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

@Service()
class Config {
    config: any = {
        development: {
            root: rootPath,
            port: 3000,
            db: {
                database: 'coa_db',
                user: 'root',
                password: 'root',
                options: {
                    host: 'localhost',
                    dialect: 'mysql',

                    pool: {
                        max: 100,
                        min: 0,
                        idle: 10000
                    }
                }
            }
        },
        test: {
            root: rootPath,
            port: 3000,
            db: {
                database: 'coa_db_test',
                user: 'root',
                password: 'root',
                options: {
                    host: 'localhost',
                    dialect: 'mysql',

                    pool: {
                        max: 100,
                        min: 0,
                        idle: 10000
                    }
                }
            }
        }
    };
    constructor() {

    }
    get(env: string) {
        return this.config[env];
    }
}

export default Config;
