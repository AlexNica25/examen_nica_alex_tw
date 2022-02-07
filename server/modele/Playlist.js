const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize');

const Playlist = sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descriere: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 200]
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Playlist;