import BaseRepository from './base-repository';
import {Repository} from "../core/annotations/ioc";
import SequelizeService from "../core/sequelize";

@Repository()
export default class UserRepository extends BaseRepository {
    constructor(private sequelizeService: SequelizeService) {
        super(sequelizeService.getDB().User);
    }

    findByUsername(username: string) {
        return this.model.findOne({
            where: {username}
        });
    }
}