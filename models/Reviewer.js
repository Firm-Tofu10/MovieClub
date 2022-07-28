const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Reviewer extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

Reviewer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (reviewerData) => {
                reviewerData.password = await bcrypt.hash(reviewerData.password, 10);
                return reviewerData;
            },
            beforeUpdate: async (upadateReviewerData) => {
                upadateReviewerData.password = await bcrypt.hash(upadateReviewerData.password, 10);
                return upadateReviewerData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'reviewer',
    }
);

module.exports = Reviewer;