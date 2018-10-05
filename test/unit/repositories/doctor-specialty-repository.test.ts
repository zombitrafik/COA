'use strict';

const chai = require('chai');
const expect = chai.expect;

import DoctorRepository from '../../../src/repositories/doctor-repository';
import DoctorSpecialtyRepository from '../../../src/repositories/doctor-specialty-repository';
import db from '../../../src/models';

describe('models/specialty', function () {

    let doctorsRepository: DoctorRepository,
        doctorSpecialtyRepository: DoctorSpecialtyRepository;

    beforeAll(function () {
        return db.sequelize.sync({force: true});
    });

    beforeEach(function () {
        doctorsRepository = new DoctorRepository();
        doctorSpecialtyRepository = new DoctorSpecialtyRepository();
    });

    describe('doctor specialties CRUD', function () {

        it('create specialty', function () {
            const specialty = {
                name: 'specialtyName 1',
                payRate: 1000.25
            };
            return doctorSpecialtyRepository.create(specialty).bind(this).then((s: any) => {
                expect(s.name).to.equal(specialty.name);
                expect(s.payRate).to.equal(specialty.payRate);
            });
        });

        it('creates a doctor', function () {
            const doctor = {
                firstName: 'firstName 1',
                lastName: 'lastName 1',
                middleName: 'middleName 1',
                birthday: new Date(),
                employmentDate: new Date(),
                specialtyId: 1
            };
            return doctorsRepository.create(doctor).bind(this).then((d: any) => {
                expect(d.firstName).to.equal(doctor.firstName);
            });
        });

        it('finds a specialty', function () {
            return doctorSpecialtyRepository.getById(1, {include: ['doctors']}).bind(this).then((specialty: any) => {
                expect(specialty.doctors.length).to.equal(1);
                expect(specialty.doctors[0].get('firstName')).to.equal('firstName 1');
            });
        });

        it('update a specialty', function () {
            const newSpecialty = {
                name: 'newSpecialtyName 1'
            };
            return doctorSpecialtyRepository.update(1, newSpecialty).bind(this).then(function () {
                return doctorSpecialtyRepository.getById(1);
            }.bind(this))
                .then((specialty: any) => {
                    expect(specialty.name).to.equal(newSpecialty.name);
                })
        });

        it('remove a specialty', function () {
            return doctorSpecialtyRepository.remove(1).bind(this).then((result: any) => {
                expect(result).to.equal(1);
            })
        })

    });
});