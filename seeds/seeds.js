const sequelize = require("../config/connection");
const { User, Book, Comment } = require("../models");
const userData = require("./userData.json");
const bookData = require("./bookData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed books
    const books = await Book.bulkCreate(bookData, {
      individualHooks: true,
      returning: true,
    });

    // Seed Comments
    const comments = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });

    // Additional logic can be added here if needed

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
