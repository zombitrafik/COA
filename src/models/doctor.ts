import Sequelize from 'sequelize';

interface DoctorAttributes {
    id?: string;
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
    employmentDate: string;
    districtNumber: number;
    createdAt?: string;
    updatedAt?: string;
}

type DoctorInstance = Sequelize.Instance<DoctorAttributes> & DoctorAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<DoctorAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        middleName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        employmentDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        districtNumber: Sequelize.INTEGER
    };
    const Doctor = sequelize.define<DoctorInstance, DoctorAttributes>('Doctor', attributes);

    Doctor.associate = models => {
        Doctor.belongsTo(models.DoctorSpecialty, {
            foreignKey: {
                name: 'specialtyId',
                allowNull: false
            }, as: 'specialty', onDelete: 'CASCADE'
        });
    };

    return Doctor;
}
