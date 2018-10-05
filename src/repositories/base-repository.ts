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

    remove(id: number | string) {
        return this.model.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }
}
