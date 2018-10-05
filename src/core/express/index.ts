import express, {ErrorRequestHandler, RequestHandler, Router} from 'express';
import {Service} from "../annotations/ioc";

//TODO AsyncBean

@Service()
class ExpressService {
    private app: express.Application;
    constructor() {
        this.app = express();
    }
    use(path: string, callback: RequestHandler | ErrorRequestHandler) {
        this.app.use(path, callback);
    }
    createRouter() {
        return express.Router();
    }
    listen(port: number) {
        return this.app.listen(port);
    }

    run() {
        return this.app.listen(3000);
    }
}

export {ExpressService, Router}
