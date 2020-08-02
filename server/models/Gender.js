const { DataTypes } = require('sequelize');

function createGenderModel(sequelize) {
    return sequelize.define('Gender', {
        genderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}


exports.default = createGenderModel;
