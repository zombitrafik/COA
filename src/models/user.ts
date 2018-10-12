import Sequelize from 'sequelize';

interface UserAttributes {
    id?: string;
    username: string;
    password: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default function (sequelize: Sequelize.Sequelize) {
    const attributes: SequelizeAttributes<UserAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM,
            values: [
                'ADMIN',
                'USER',
                'RECEPTIONIST'
            ],
            defaultValue: 'USER',
            allowNull: false
        }
    };

    return sequelize.define<UserInstance, UserAttributes>('User', attributes);
}
