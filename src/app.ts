import db from './models';

const app = {p: 1};

db.sequelize.sync()
    .then(function () {
        console.log('started');
    });


module.exports = app;