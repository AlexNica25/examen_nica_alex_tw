const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sample', 'postgres', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
})

module.exports = sequelize;