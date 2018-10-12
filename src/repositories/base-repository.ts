import {Op} from 'sequelize';

export default class BaseRepository {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    create(data: any) {
        return this.model.create(data);
    }

    getById(id: number | string, options: any = {}) {
        return this.model.findById(id, options);
    }

    getAll() {
        return this.model.findAll();
    }

    update(id: number | string, data: any) {
        return this.model.update(data, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
        }, {
            returning: true, plain: true
        })
    }

    delete(id: number | string) {
        return this.model.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }
}
