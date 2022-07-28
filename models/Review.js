const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reviewer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reviewer',
                key: 'id' //this might need to be fixed
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
      }
);

module.exports = Review;