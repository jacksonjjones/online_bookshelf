const sequelize = require('../config/connection');
const { Book } = require('../models');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const books = await Book.bulkCreate(bookData, {
      individualHooks: true,
      returning: true,
    });

    // Additional logic can be added here if needed

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();