'use strict';

const chai = require('chai');
const expect = chai.expect;

import DoctorRepository from '../../../src/repositories/doctor-repository';
import DoctorSpecialtyRepository from '../../../src/repositories/doctor-specialty-repository';
import db from '../../../src/models';

describe('models/doctor', function () {

    let doctorsRepository: DoctorRepository, doctorSpecialtyRepository: DoctorSpecialtyRepository;

    beforeAll(function () {
        return db.sequelize.sync({force: true});
    });

    beforeEach(function () {
        doctorsRepository = new DoctorRepository();
        doctorSpecialtyRepository = new DoctorSpecialtyRepository();
    });

    describe('doctors CRUD', function () {
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

        it('finds a doctor', function () {
            return doctorsRepository.getById(1, {include: ['specialty']}).bind(this).then((doctor: any) => {
                expect(doctor.specialty.get('name')).to.equal('specialtyName 1');
                expect(doctor.firstName).to.equal('firstName 1');
            });
        });

        it('update a doctor', function () {
            const newDoctor = {
                firstName: 'newFirstName 1'
            };
            return doctorsRepository.update(1, newDoctor).bind(this).then(function () {
                return doctorsRepository.getById(1);
            }.bind(this))
                .then((doctor: any) => {
                    expect(doctor.firstName).to.equal(newDoctor.firstName);
                })
        });

        it('remove a doctor', function () {
            return doctorsRepository.remove(1).bind(this).then((result: any) => {
                expect(result).to.equal(1);
            })
        })
    });
});