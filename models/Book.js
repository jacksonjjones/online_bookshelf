const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        genre: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        thumbnail: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }

        }
    },
    {
        sequelize,
        timesamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book'
    }
);

module.exports = Book;