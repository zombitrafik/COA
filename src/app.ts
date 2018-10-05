import {ApplicationContext} from './application-context';

class Application {
    context: ApplicationContext;
    constructor() {
        this.context = new ApplicationContext();
    }

    async run() {
        await this.getExpressService().listen(3000);
        await this.getSequelizeService().getDB().sequelize.sync();
    }

    getExpressService() {
        return this.context.getContainer().get('ExpressService');
    }

    getSequelizeService() {
        return this.context.getContainer().get('SequelizeService');
    }
}

const app = new Application();
app.context.run(); //TODO promise

app.run();

export {app};


/*
import db from './models';

db.sequelize.sync()
    .then(function () {
        console.log('started');
    });
*/
