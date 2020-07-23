const {DataTypes} = require('sequelize');

function createStudentModel(sequelize, Color, Gender, Group, Specialty) {
    return sequelize.define('Student', {
        avatar: {
            type: DataTypes.TEXT
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialtyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Specialty,
                key: 'specialtyId'
            }
        },
        groupNumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Group,
                key: 'groupNumId'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Gender,
                key: 'genderId'
            }
        },
        favoriteColorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Color,
                key: 'colorId'
            }
        }
    })
}


exports.default = createStudentModel;
