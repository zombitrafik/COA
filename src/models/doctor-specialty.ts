import Sequelize from 'sequelize';

interface DoctorSpecialtyAttributes {
    id?: string;
    name: string;
    payRate: number;
    isNarrow?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

type DoctorSpecialtyInstance = Sequelize.Instance<DoctorSpecialtyAttributes> & DoctorSpecialtyAttributes;

export default function (sequelize: Sequelize.Sequelize) {
    const attributes: SequelizeAttributes<DoctorSpecialtyAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isNarrow: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        payRate: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    };
    const DoctorSpecialty = sequelize.define<DoctorSpecialtyInstance, DoctorSpecialtyAttributes>('DoctorSpecialty', attributes);

    DoctorSpecialty.associate = models => {
        DoctorSpecialty.hasMany(models.Doctor, { as: 'doctors', foreignKey: 'specialtyId' });
    };

    return DoctorSpecialty;
}
