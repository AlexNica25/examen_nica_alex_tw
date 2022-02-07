const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize');

const Song = sequelize.define('song', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titlu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 200]
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    stil: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['POP', 'ALTERNATIVE', 'ROCK']]
        }
    }
})

module.exports = Song;