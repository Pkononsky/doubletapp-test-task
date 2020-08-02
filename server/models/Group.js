const { DataTypes } = require('sequelize');

function createGroupModel(sequelize) {
    return sequelize.define('Group', {
        groupNumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        groupNum: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}


exports.default = createGroupModel;
