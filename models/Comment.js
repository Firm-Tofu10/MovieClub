const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'review',
                key: 'id'
            }
        },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
);

module.exports = Comment;