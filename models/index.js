const Book = require("./Book");
const User = require("./User");
const Comment = require("./Comment")

User.hasMany(Book, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Book, User, Comment };
