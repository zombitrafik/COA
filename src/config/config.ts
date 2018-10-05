const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const config: any = {
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

export default config[env]

//TODO redo @Service
