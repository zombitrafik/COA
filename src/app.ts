import {ApplicationContext} from './application-context';

class Application {
    context: ApplicationContext;
    constructor() {
        this.context = new ApplicationContext();
    }

    async run() {
        await this.getExpressService().run();
        await this.getSequelizeService().run();
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
