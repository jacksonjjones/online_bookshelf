const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
        book_id: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        genre: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
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