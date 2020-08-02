const { DataTypes } = require('sequelize');

function createColorModel(sequelize) {
    return sequelize.define('Color', {
        colorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        colorPicture: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}


exports.default = createColorModel;
