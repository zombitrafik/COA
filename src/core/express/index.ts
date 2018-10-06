import express, {ErrorRequestHandler, RequestHandler, Router} from 'express';
import {Service} from "../annotations/ioc";
import Config from "../../config/config";

const env = process.env.NODE_ENV || 'development';

//TODO AsyncBean

@Service()
class ExpressService {
    private app: express.Application;
    private config: Config;
    constructor(config: Config) {
        this.config = config;

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
        return this.app.listen(this.config.get(env).port);
    }
}

export {ExpressService, Router}
