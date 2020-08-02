const { DataTypes } = require('sequelize');

function createSpecialtyModel(sequelize) {
    return sequelize.define('Specialty', {
        specialtyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialtyAbbreviation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}


exports.default = createSpecialtyModel;
